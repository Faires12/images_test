const deletes = document.querySelectorAll('.delete')

for(var i = 0; i < deletes.length; i++){
    const del = deletes[i]
    del.addEventListener('click', () => {
        let conf = confirm("Want do delete?")
        if(conf){
            window.location.href = del.id
        }
    })
}

