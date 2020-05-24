// All DOMs
const submit_button = document.querySelector('#submit');
const all_tasks = document.querySelector('#all_tasks');

// Stores all tasks
const tasks = [];

// Isolates the date from the Date data type
function extract_date(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Calculates days left until due date
function calculate_days_left(start_date, end_date){}

// Creates HTML for alerts
function task_html(){}

// Puts task name and due date into task object and puts into tasks list
function get_task(){}

// Removes task from task list
function remove_task(){}

// Main function to populate task list
function create_alerts(event){
    const data = event.formData;
    const values = [...data.values()];
    const task_name = values[0];
    const due_date = new Date(values[1]+'T00:00:00');
    //const days_left = calculate_days_left(today, due_date.value)
}

const form = document.forms[0];
form.addEventListener('submit', function(event) {
    event.preventDefault();
    new FormData(form)
});

form.addEventListener("formdata", create_alerts);