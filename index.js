class Account {

  constructor(username) {
    this.username = username;
    this.transactions = []; // Initialize an empty array to store transactions
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  get value() {
    return this.amount;
  }

  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    if (this.isAllowed()) {
      this.account.addTransaction(this);
    } else {
      console.log("Transaction denied: Insufficient balance.");
    }
  }

  isAllowed() {
    return true; // This is a placeholder; you can implement validation here.
  }
}

class Deposit extends Transaction {

  isAllowed() {
    return true; // Deposits are always allowed
  }

  commit() {
    super.commit(); // Call the commit method of the parent class to add the transaction
    this.account.addTransaction(this); // Add the transaction to the account
  }
}


class Withdrawal extends Transaction {

  isAllowed() {
    return this.account.balance >= this.amount;
  }

  commit() {
    if (this.isAllowed()) {
      this.account.balance -= this.amount;
      super.commit();
    } else {
      console.log("Transaction denied: Insufficient balance.");
    }
  }
}

// Create an account
const myAccount = new Account("snow-patrol");

// Create and commit transactions
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
