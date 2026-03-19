require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const pool = require('./index');

const schema = `
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    skill_description TEXT,
    start_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    logged_at TIMESTAMPTZ DEFAULT now(),
    notes TEXT,
    UNIQUE(enrollment_id, day_number)
  );

  CREATE TABLE IF NOT EXISTS flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty TEXT DEFAULT 'medium'
  );
`;

const pythonSeeds = [
  ['python', 'What is a list comprehension in Python?', 'A concise way to create lists: [expr for item in iterable if condition]', 'easy'],
  ['python', 'What is the difference between a list and a tuple?', 'Lists are mutable (can be changed); tuples are immutable (cannot be changed after creation).', 'easy'],
  ['python', 'What does the `*args` syntax do in a function definition?', 'Allows a function to accept any number of positional arguments, collected into a tuple.', 'medium'],
  ['python', 'What does `**kwargs` do in a function definition?', 'Allows a function to accept any number of keyword arguments, collected into a dict.', 'medium'],
  ['python', 'What is a generator in Python?', 'A function that yields values one at a time using `yield`, enabling lazy evaluation and memory efficiency.', 'medium'],
  ['python', 'What is the GIL in CPython?', 'The Global Interpreter Lock — a mutex that prevents multiple native threads from executing Python bytecode simultaneously.', 'hard'],
  ['python', 'What is a decorator?', 'A function that wraps another function to extend or modify its behavior, applied with the `@` syntax.', 'medium'],
  ['python', 'How do you handle exceptions in Python?', 'Using try/except blocks: `try: ... except ExceptionType as e: ...`', 'easy'],
  ['python', 'What is the difference between `is` and `==`?', '`==` checks value equality; `is` checks identity (same object in memory).', 'easy'],
  ['python', 'What are Python\'s built-in data types?', 'int, float, complex, str, bytes, list, tuple, dict, set, frozenset, bool, NoneType', 'easy'],
  ['python', 'What is a context manager and how do you use it?', 'An object implementing `__enter__` and `__exit__` used with the `with` statement to manage resources (e.g., file handles).', 'medium'],
  ['python', 'What is the difference between `deepcopy` and `copy`?', '`copy` creates a shallow copy (nested objects still shared); `deepcopy` recursively copies all nested objects.', 'medium'],
];

const javaSeeds = [
  ['java', 'What is the difference between `==` and `.equals()` in Java?', '`==` compares references (memory address); `.equals()` compares object content.', 'easy'],
  ['java', 'What is autoboxing in Java?', 'Automatic conversion between primitive types (int, double) and their wrapper classes (Integer, Double).', 'easy'],
  ['java', 'What is the difference between an interface and an abstract class?', 'Interfaces define contracts with no state; abstract classes can have state and partial implementations. A class can implement multiple interfaces but extend only one abstract class.', 'medium'],
  ['java', 'What are checked vs unchecked exceptions?', 'Checked exceptions must be declared or caught (e.g., IOException); unchecked exceptions extend RuntimeException and do not require explicit handling.', 'medium'],
  ['java', 'What is the Java Memory Model?', 'Specifies how threads interact through memory, including visibility guarantees and the `volatile` keyword.', 'hard'],
  ['java', 'What is a functional interface?', 'An interface with exactly one abstract method, usable as a lambda expression target (e.g., Runnable, Comparator).', 'medium'],
  ['java', 'What does the `final` keyword do?', 'On a variable: value cannot be reassigned. On a method: cannot be overridden. On a class: cannot be subclassed.', 'easy'],
  ['java', 'What is the difference between ArrayList and LinkedList?', 'ArrayList uses a dynamic array (O(1) random access, O(n) insert/delete); LinkedList uses a doubly-linked list (O(n) access, O(1) insert/delete at ends).', 'medium'],
  ['java', 'What is a Java Stream?', 'A sequence of elements supporting aggregate operations (map, filter, reduce) in a declarative style, introduced in Java 8.', 'medium'],
  ['java', 'What is the difference between `String`, `StringBuilder`, and `StringBuffer`?', '`String` is immutable. `StringBuilder` is mutable and not thread-safe. `StringBuffer` is mutable and thread-safe (synchronized).', 'medium'],
  ['java', 'What is the purpose of the `synchronized` keyword?', 'Ensures that only one thread can execute a method or block at a time, preventing race conditions.', 'medium'],
  ['java', 'What is dependency injection?', 'A design pattern where an object receives its dependencies from the outside rather than creating them internally, improving testability and decoupling.', 'hard'],
];

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Running migrations...');
    await client.query(schema);
    console.log('Schema created.');

    console.log('Seeding flashcards...');
    for (const [language, question, answer, difficulty] of [...pythonSeeds, ...javaSeeds]) {
      await client.query(
        `INSERT INTO flashcards (language, question, answer, difficulty)
         SELECT $1, $2, $3, $4
         WHERE NOT EXISTS (
           SELECT 1 FROM flashcards WHERE language = $1 AND question = $2
         )`,
        [language, question, answer, difficulty]
      );
    }
    console.log('Seed complete.');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
