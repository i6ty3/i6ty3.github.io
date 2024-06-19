function addTransaction() {
    const accountName = document.getElementById('accountName').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;

    // Create a new transaction object
    const newTransaction = { amount, description };

    // Save the transaction online (You'd typically use a serverless function for this)
    saveTransaction(accountName, newTransaction);

    // Update the total amount
    updateTotalAmount();
}

// Function to save the transaction to an online file (Replace with actual backend logic)
function saveTransaction(accountName, transaction) {
    // In a real-world scenario, you'd make an HTTP request to a serverless function or backend to store the data
    console.log(`Saving transaction for ${accountName}`, transaction);
}

// Function to update the total amount (Replace with actual backend logic)
function updateTotalAmount() {
    // In a real-world scenario, you'd make an HTTP request to calculate the total amount from stored data
    const totalAmount = 0; // Replace with actual total amount calculation
    document.getElementById('totalAmount').textContent = totalAmount;
}

document.addEventListener('DOMContentLoaded', function () {
    const accounts = ['BKash', 'DBBL', 'IBBL', 'BRAC', 'Rocket', 'CellFin', 'Cash'];
    const transactions = {
        'BKash': [{ amount: 50, description: 'Groceries' }, { amount: 20, description: 'Dinner' }],
        'DBBL': [{ amount: 30, description: 'Coffee' }, { amount: 15, description: 'Lunch' }],
        'Rocket': [{ amount: 100, description: 'Shopping' }],
    };
    const accountsSection = document.getElementById('accounts');
    const transactionsSection = document.getElementById('transactions');


    Object.entries(transactions).forEach(([account, trx]) => {

        const balance = trx.reduce((accumulator, currentTransaction) => {
            return accumulator + currentTransaction.amount;
        }, 0);


        const accBal = document.createElement('div')
        accBal.innerHTML = `${account} : ${balance}`
        accountsSection.appendChild(accBal)
    })








});




window.addEventListener("load", function () {
    const form = document.getElementById('contactForm');
    const successElement = document.getElementById('submitSuccessMessage');
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                successElement.style.display = 'block';
                setTimeout(() => {
                    successElement.style.display = 'none';
                }, 5000);
            })
            .then(data => {
                form.reset();
            })
    });
});
