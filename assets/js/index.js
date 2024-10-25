//Reloads the site when browser back button is pressed
(function () {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})();

$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#add_member").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#add_book").submit(function(event){
    alert("Data Inserted Successfully!");
})

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

// Delete Member in Dashboard and Members Page
if(window.location.pathname == "/dashboard" || window.location.pathname == "/members"){
    $ondelete = $(".delete-member");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/member/${id}`,
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

// Delete Book in Dashboard and Books Page
if(window.location.pathname == "/dashboard" || window.location.pathname == "/books" ){
    $ondelete = $(".delete-book");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/book/${id}`,
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

// Return Book in dashboard and duebooks page
if(window.location.pathname == "/dashboard" || window.location.pathname == "/due-books"){
    $ondelete = $(".return-book");
    $ondelete.click(function(){
        var bookId = $(this).attr("book-id");
        var memberId = $(this).attr("member-id");
        var serialId = $(this).attr("serial-id")

        var request = {
            "url" : `http://localhost:3000/api/returnBook?bookId=${bookId}&memberId=${memberId}&serialId=${serialId}`,
            "method" : "GET"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

// Issue Book
if(window.location.pathname == "/issue-book"){
    $onIssue = $(".issue-book");
    $onIssue.click(function(){
        var memberId = $(this).attr("member-id");
        var bookId =  $(this).attr("book-id")

        var request = {
            "url" : `http://localhost:3000/api/issueBook/${bookId}/${memberId}`,
            "method" : "POST"
        }

        $.ajax(request).done(function(response){
            alert("Book Issued Successfully!");
            location.reload();
        })

    })
}