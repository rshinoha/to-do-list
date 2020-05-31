// All DOMs
const submit_button = document.querySelector('#submit');
const all_tasks = document.querySelector('#all_tasks');

// Stores all tasks
let tasks = [];

// Isolates the date from the Date data type
function extract_date(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Calculates days left until due date
function calculate_days_left(start_date, end_date){
    const seconds_left = extract_date(end_date) - extract_date(start_date);
    return Math.round(seconds_left / 1000 / 60 / 60 / 24);
}

// Creates HTML for alerts
function task_html(){
    const output = [];
    tasks.forEach(
        (task, taskNum) => {
            let color = "";
            if (task.days_left < 3){
                color = "danger";
            }
            else if (task.days_left < 7){
                color = "warning";
            }
            else {
                color = "secondary";
            }
            output.push(
                `<div class="alert alert-${color} alert-dismissible fade show" role="alert" id="task${taskNum}"><p>${task.task_name}</p><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><p>${task.days_left} day(s)</p></div>`
            );
        }
    );
    return output;
}

// Puts task name and due date into task object and puts into tasks list
function get_task(task_name, days_left){
    tasks.push({"task_name": task_name, "days_left": days_left});
}

// Removes task from task list
function remove_task(){
    let html_str = all_tasks.innerHTML;
    // Will end up containing position of all tasks that still need to be completed
    const incomplete_tasks_idx = [];
    // Will end up containing all tasks that still need to be completed
    const incomplete_tasks = [];
    // Keeps track of current position in html_str
    let cur_index = 0;
    // String for where to find task ID numbers
    const search = 'id=\"task';
    // String that signals end of ID numbers
    const end_search = '\">';
    // Deletes task position in tasks array that still needs to be completed
    while (html_str.indexOf(search) != -1){
        // Will start reading ID number at the end of search string
        cur_index = html_str.indexOf(search) + search.length;
        // Need to use substring to find the correct location of the end of the index number
        const end_index = html_str.indexOf(end_search, cur_index);
        incomplete_tasks_idx.push(Number(html_str.substring(cur_index, end_index)));
        // Move index further
        cur_index = end_index + end_search.length;
        // Create substring to remove tasks that have already been accounted for
        html_str = html_str.substring(cur_index, html_str.legnth);
    }
    // Loop through tasks list to get all deleted tasks using incomplete_tasks_idx
    for (var i = 0; i < tasks.length; i++){
        if (incomplete_tasks_idx.includes(i)){
            incomplete_tasks.push(tasks[i]);
        }
    }
    tasks = incomplete_tasks;
}

// Main function to populate task list
function create_alerts(event){
    remove_task();
    const data = event.formData;
    const values = [...data.values()];
    const task_name = values[0];
    const today = extract_date(new Date());
    const due_date = new Date(values[1]+'T00:00:00');
    const days_left = calculate_days_left(today, due_date);
    if(days_left > 0){
        get_task(task_name, days_left);
    }
    // Think of error messages to post if invalid date is used
    
    // Sorts tasks by days remaining
    tasks = tasks.sort((a, b) => (a.days_left > b.days_left) ? 1 : -1);
    all_tasks.innerHTML = task_html(tasks);
}

const form = document.forms[0];
form.addEventListener('submit', function(event) {
    event.preventDefault();
    new FormData(form)
});

form.addEventListener("formdata", create_alerts);