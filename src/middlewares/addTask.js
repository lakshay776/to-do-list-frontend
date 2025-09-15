async function addNewTask(newTask) {
    try {
        const res = await fetch('http://localhost:8000/todos/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || 'Failed to add task');
        }
        
        console.log('Added:', data);
        return { success: true, data };
        
    } catch (err) {
        console.log('Error adding task:', err);
        return { success: false, error: err.message };
    }
}

// Export the function directly
export default addNewTask;