// Simple Expense Tracker Blockchain using JavaScript (Beginner Friendly)
const crypto = require("crypto-js"); // install: npm i crypto-js

class Block {
  constructor(index, amount, note, previousHash = "") {
    this.index = index;
    this.amount = amount;
    this.note = note;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.SHA256(
      this.index + this.amount + this.note + this.previousHash
    ).toString();
  }
}

class ExpenseBlockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, 0, "Genesis Block", "0");
  }

  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addExpense(amount, note) {
    const newBlock = new Block(
      this.chain.length,
      amount,
      note,
      this.latestBlock().hash
    );
    this.chain.push(newBlock);
  }

  showExpenses() {
    return this.chain;
  }
}

// Example
let expenses = new ExpenseBlockchain();
expenses.addExpense(200, "Food");
expenses.addExpense(100, "Travel");
expenses.addExpense(300, "Shopping");

console.log(JSON.stringify(expenses.showExpenses(), null, 2));
