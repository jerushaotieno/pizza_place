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

function calculateTotal() {
    let total = 0;
    cart.forEach((order) => {
        total += order.price;
    });

    $(".total_cost").html(`KES <span class="text-bold">${total}</span> `);

}

// frontend logic

//add button
$(document).ready(function() {
    
// cart checkout
    const checkoutCart = [];
    // confirm cart is empty
    if (checkoutCart.length == 0) {
        $(".empty-cart").show();
        $(".delivery-button").hide();
    } else {
        $(".empty-cart").hide();
    }
    $("#order-form").on("submit", function (e) {
        //prevent default action
        e.preventDefault();

        const selectedPizzaName = $("#pizza").val();
        const selectedSize = $("#size").val();
        const selectedCrust = $("#crust").val();
        const selectedToppings = $("input[name='toppings[]']:checkbox:checked")
            .map(function () {
                return $(this).val();
            })
            .get();
        // validation for all fields
        if (!selectedPizzaName || !selectedSize || !selectedCrust) {
            $("#error").text("** Please select a pizza, size and crust 🙂** ");
            return;
        } else {
            $("#error").text("");
        }
        // cart details
        //check if selected pizza exists in cart
        const cartPizza = cart.find((pizza) => {
            const sameToppings =
                JSON.stringify(pizza.toppings) == JSON.stringify(selectedToppings);

            return (
                pizza.name == selectedPizzaName &&
                pizza.size.size == selectedSize &&
                sameToppings
            );
        });
        //if it exists increase quantity
        if (cartPizza) {
            cartPizza.setQuantity(cartPizza.quantity + 1);
        } else {
            const pizza = new Pizza(selectedPizzaName);
            pizza.setSize(selectedSize);
            pizza.setCrust(selectedCrust);
            pizza.setTopings(selectedToppings);

            cart.push(pizza);
        }
        // empty tbody first
        $(".order-table tbody").html("");
        //loop and append
        cart.forEach((pizza, cartIndex) => {
            $(".order-table tbody").append(`
            <tr>
                <td>${pizza.name}</td>
                <td>${pizza.size.size}</td>
                <td>${pizza.crust.name}</td>
                <td>${pizza.toppings.join(", ")}</td>
                <td>
                    <input type="number" min="1" class="input-sm form-control pizza-quantity" data-cart-index="${cartIndex}" value="${pizza.quantity
                }" />
                </td>
                <td>Ksh ${pizza.price}</td>
            </tr>
        `);
            // show checkout button
            $(".delivery-button").show();
            // console.log(pizza);
            //update grand total
            calculateGrandTotal();

        });

    });
    //pizza quantity change event
    $("body").on("change", ".pizza-quantity", function () {
        const quantity = $(this).val();
        const cartIndex = $(this).data("cart-index");
        const pizza = cart[cartIndex];

        if (quantity > 0) {
            pizza.setQuantity(quantity);
            // update line total
            $(this).parent().next().html(`Ksh <span class="text-bold">${pizza.price}</span> `);
        }

        //update grand total
        calculateGrandTotal();
    });

    // delivery modal
    $("#delivery-form").on("submit", function (e) {
        //prevent default action
        e.preventDefault();
        // check if the user has selected the radio button
        const selectd = $("input[name='deliveryMethod']:checked");
        if (selectd.val() == undefined) {
            $(".delivery-option").html("<p class='text-danger'>** Please select the delivery method **</p>");
            return;
        } else {
            $(".delivery-option").text("");
            // check which radio button was selected
            if (selectd.val() == "delivery") {
                $("#location-input-details").show();
                // user inputs variables
                const customerName = $("#customerName").val();
                const customerPhone = $("#customerPhone").val();
                const customerLocation = $("#customerLocation").val();
                const additionalInfo = $("#additionalInfo").val();
                // validate user inputs
                if (!customerName || !customerPhone || !customerLocation) {
                    $(".error-delivery-location").text("Fill in all input fields with * to proceed!")
                    return;
                } else {
                    $(".error-delivery-location").text("");
                }
                function calculateGrandTotal() {
                    let total = 0;
                    cart.forEach((pizza) => {
                        total += pizza.price;
                    });
                    const getTotalPlusDeliveryFee = total + 128;
                    console.log(getTotalPlusDeliveryFee);
                    console.log(cart);
                    $("#select-delivery-method").hide();
                    $(".delivery-head").append(`
                    <div class="alert alert-success" role="alert">Hello ${customerName}. Order successfully processed. Your order will be delivered to your location(${customerLocation})🙂</div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5>Order Summary 😇</h5>
                            </div>
                            <div>
                                <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                            </div>
                        </div>
                    `);
                    //loop and append
                    cart.forEach((pizza, cartIndex) => {
                        $(".delivery-bottom").append(`
                        <div>
                        <div class="row">
                            <div class="col-md-12">
                                <ol class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">${pizza.name}(${pizza.size.size})</div>
                                            Crust - ${pizza.crust.name} <br>
                                            Toppings - ${pizza.toppings.join(", ")}
                                        </div>
                                        <span class="badge bg-primary rounded-pill">${pizza.quantity}</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                       </div>
                        `);
                    });

                }
                calculateGrandTotal()
                // $("#deliveryMethodModal").hide();
            } else if (selectd.val() == "pickup") {
                function calculateGrandTotal() {
                    let total = 0;
                    cart.forEach((pizza) => {
                        total += pizza.price;
                    });
                    const getTotalPlusDeliveryFee = total;
                    console.log(getTotalPlusDeliveryFee);
                    $("#select-delivery-method").hide();
                    $(".delivery-head").append(`
                    <div class="alert alert-success" role="alert">Hello. Order successfully processed. Your order will be delivered to your location 🙂</div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5>Order Summary 😇</h5>
                            </div>
                            <div>
                                <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                            </div>
                        </div>
                    `);
                    //loop and append
                    cart.forEach((pizza, cartIndex) => {
                        $(".delivery-bottom").append(`
                        <div>
                        <div class="row">
                            <div class="col-md-12">
                                <ol class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">${pizza.name}(${pizza.size.size})</div>
                                            Crust - ${pizza.crust.name} <br>
                                            Toppings - ${pizza.toppings.join(", ")}
                                        </div>
                                        <span class="badge bg-primary rounded-pill">${pizza.quantity}</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                       </div>
                        `);
                    });

                }
                calculateGrandTotal()
            }
        }

    })


        var subTotal = price(size, crust, toppings);
        var Total = total + 300;
        var order = new Pizza(size, crust, toppings)
        $(".current-order").append('<tr><td id="name">' + order.pizza + '</td><td id="size">' + order.size + '</td><td id="crust">' + order.crust + '</td><td id="toppings">' + order.toppings + '</td><td id="total">' + total);

        //Pickup button
        $("#pick-up").click(function() {
            alert("Dear customer, your order will be ready in an hour. Your order total is: " + total);

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