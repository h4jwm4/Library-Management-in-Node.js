$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#add_member").submit(function(event){
    alert("Data Inserted Successfully!");
})

<<<<<<< HEAD
=======
$("#add_book").submit(function(event){
    alert("Data Inserted Successfully!");
})

>>>>>>> books_feature
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

// Delete Member
if(window.location.pathname == "/member"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/member/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this member?")){
            $.ajax(request).done(function(response){
                alert("Member Deleted Successfully!");
                location.reload();
            })
        }

    })
}

$("#update_member").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/member/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

<<<<<<< HEAD
})
=======
})

//Update Book
$("#update_book").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
    var request = {
        "url" : `http://localhost:3000/api/book/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Book Updated Successfully!");
    })

})

// Delete Book
if(window.location.pathname == "/book"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/book/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this book?")){
            $.ajax(request).done(function(response){
                alert("Book Deleted Successfully!");
                location.reload();
            })
        }

    })
}
>>>>>>> books_feature
