#!/bin/bash

# Define the name of your PostgreSQL container
container_name="postgres"

# Command to enter the container's terminal
enter_container="docker exec -it $container_name bash"

# Command to execute psql
psql_command="psql -U postgres"

# SQL command to create the table
create_table_sql="CREATE TABLE names (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);"

# Command to exit psql
exit_psql="\q"

# Execute the commands
$enter_container -c "$psql_command -c \"$create_table_sql\""
$enter_container -c "$psql_command"
$enter_container -c "$exit_psql"
