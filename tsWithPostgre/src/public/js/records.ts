

const  deleteRecord = async (btn:any) => {
  const recordId = btn.parentNode.querySelector('[name=recordId]').value
  const recordElement = btn.closest('div') as HTMLElement
  try {
    const result = await fetch("http://localhost:3001/deleteRecord?recordId="+ recordId,{
        method: 'DELETE',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("jwt")
        }
    })
    await result.json()
    recordElement.remove()
    console.log('record deleted successfully')
  }catch(err) {
    console.log(err)
  }
};
