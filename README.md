## Development server
Run `npm install` to install all dependencies, then run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`.

## Data page
###### Filter
The app contains filter field, that enables you to filter with `id`, `grade` or `date`.<br>
The valid operators are: `:` for equal data, for example: `id: 3`, returns the list of all the students with id 3.<br>
`>`, for example `grade > 90`, returns all students that have grades bigger than 90.<br>
`<`, for example `date < 1/1/2016`, returns all students with courses before the first day of 2016.
###### Data table
The table contains all courses of all the students.<br>
Clicking on one row will show the details window on the left side of the page.<br>
When a student is clicked there is an option to update or remove this student/course from the DB

## Statistics page
This page presents the statistics of all the data, separated by student average and course average.<br>
There are two selected options to choose which student or courses you want to calculate.
