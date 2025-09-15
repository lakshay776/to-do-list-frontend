async function deleteTask(taskName) {
    try {
      await fetch('http://localhost:8000/todos/deleteTask', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskName })
      })
    } catch (err) {
      console.log(err)
    }
  }
export default deleteTask