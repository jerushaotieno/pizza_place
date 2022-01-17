//backend logic
function Pizza(size, crust, toppings) {
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
}

var sizePrice, crustPrice, toppingPrice;

//calculation for the price of a pizza
var price = function(size, crust, toppings) {
    switch (size) {
        case "":
            sizePrice = 0;
            break;
        case "mega":
            sizePrice = 800;
            break;
        case "large":
            sizePrice = 600;
            break;
        case "medium":
            sizePrice = 400;
            break;
        case "small":
            sizePrice = 200;
            break;
        default:
            location.reload();
};

    switch (crust) {
        case "":
            crustPrice = 0;
            break;
        case "crispy":
            crustPrice = 300;
            break;
        case "stuffed":
            crustPrice = 300;
            break;
        case "gluten-free":
            crustPrice = 300;
            break;
        case "cracker":
            crustPrice = 300;
            break;
        case "flat-bread":
            crustPrice = 300;
            break;
        case "thin":
            crustPrice = 300;
            break;
        case "cheese":
            crustPrice = 300;
            break;
        case "thick":
            crustPrice = 300;
            break;
        default:
            location.reload();
    };

    if (size == 'mega') {
        toppingsPrice = toppings.length * 150;
    } else if (size == 'large') {
        toppingsPrice = toppings.length * 120;
    } else if (size == 'medium') {
        toppingsPrice = toppings.length * 80;
    } else if (size == 'small') {
        toppingsPrice = toppings.length * 50;
    }

    var subTotal = sizePrice + crustPrice + toppingsPrice;
    return subTotal;
}

// frontend logic

$(document).ready(function() {
    $("#order_now").click(function() {
        $(".order_details").show();
        $(".button").hide();
    })

//Add button
$(".add_button").click(function(event) {
    event.preventDefault();
    $(".checkout").show();
    $(".order_details").hide();

//getting order details
    let size = $("#size option:selected").val();
    let crust = $("#crust option:selected").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function() {
        toppings.push($(this).val());
    });

    var subTotal = price(size, crust, toppings);
    var Total = total + 300;
    var order = new Pizza(size, crust, toppings)
    $(".existing_order").append('<tr><td id="name">' + '</td><td id="size">' + order.size + '</td><td id="crust">' + order.crust + '</td><td id="toppings">' + order.toppings + '</td><td id="sub_total">' + sub-total);

//Pickup button
    $("#pick-up").click(function() {
        alert("Thank you for ordering. Your order will be ready in an hour. Your total is: " + total);

//to refresh the page
        location.reload();
    })    

//Checkout button
    $("#checkout").click(function() {

//input data from client details form 

        var clientName = $("#customer_name").val();
        var clientNumber = $("#customer_phone_number").val();
        var clientEmail = $("#customer_email").val();
        var clientLocation = $("#additional_details").val();

        if (clientName === "" || clientNumber === "" || clientEmail === "" || clientLocation === "") {
            alert("Please fill in all the detail fields in the delivery form.")
        } else {
            alert("Dear " + clientName + " we will deliver your order to " + clientLocation + " in an hour! Your total order total is: " +
                Total + " We will contact on call upon arrival");
        }
    })
})


//Add another order
$("#add_order").click(function(event) {
    event.preventDefault();

        //Add an extra order
        $(".checkout").hide();
        $(".delivery_details").hide();
        $(".order_details").show();
        document.getElementById("form1").reset();
    })

    //Delivery button
    $("#delivery").click(function() {
        $(".choose_delivery_method").hide();
        $(".delivery_details").slideDown();
    })
})