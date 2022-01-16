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
            alert("Please choose a pizza size");
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
            alert("Please choose a crust");
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

//add button
    $(".button").click(function(event) {
        event.preventDefault();
        let size = $("#size option:selected").val();
        let crust = $("#crust option:selected").val();
        var toppings = [];
        $("input:checkbox[name=toppings]:checked").each(function() {
            pizzaTopping.push($(this).val());
        });

        var total = price(pizzaSize, pizzaCrust, pizzaTopping);
        var grandTotal = total + 200;
        var order = new Pizza(pizzaName, pizzaSize, pizzaCrust, pizzaTopping)
        $(".current-order").append('<tr><td id="name">' + order.pizza + '</td><td id="size">' + order.size + '</td><td id="crust">' + order.crust + '</td><td id="toppings">' + order.toppings + '</td><td id="total">' + total);

        //Pickup button
        $("#pick-up").click(function() {
            alert("Dear customer, your order will be ready for pickup in 1 hour. Your order total is: " + total);

            //refresh page
            location.reload();
        })

        //Checkout button
        $("#checkout").click(function() {
            //form data
            var clientName = $("#full-name").val();
            var clientNumber = $("#phone-number").val();
            var clientLocation = $("#location").val();

            if (clientName === "" || clientNumber === "" || clientLocation === "") {
                alert("Please fill in the delivery form. All fields are required")
            } else {
                alert("Dear " + clientName + " your order will be delivered to " + clientLocation + " within the hour! Your order total is: " +
                    grandTotal + " Our rider will call you on arrival");
            }
        })
    })


    //Add another pizza
    $("#add").click(function(event) {
        event.preventDefault();

        //Add an extra order
        $(".view-three").hide();
        $(".view-four").hide();
        $(".view-two").show();
        document.getElementById("form1").reset();
    })

    //Delivery button
    $("#delivery").click(function() {
        $(".table-buttons").hide();
        $(".view-four").slideDown();
    })
})