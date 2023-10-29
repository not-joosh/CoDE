/*===========================
*                           
*       DOM ELEMENTS        
*                           
*===========================*/
/*RESET BUTTON*/
const reset_btn = document.querySelector('.reset-btn');

/*TIP BUTTONS */
const tip_buttons = document.querySelectorAll('button:not(.reset-btn)');
const custom_tip_input = document.querySelector('.custom-percentage');

/*OUTPUT FIELDS*/
const tip_amount_element = document.querySelector('.tip-amount');
const total_amount_element = document.querySelector('.total-amount');

/*INPUT FIELDS*/
const input_fields = document.querySelectorAll('.input-field');
/*
*        input_fields[0] = Bill
*        input_fields[1] = Number of people
*/

/*===========================
*                           
*       CONSTANTS       
*                           
*===========================*/

/*INPUT VARIABLES*/
let num_of_people = 0;
let bill_amount = 0;
let tip_percentage = 0;

/* PER PERSON VARIABLES*/
let tip_amount = 0;
let total_amount = 0;


/*===========================
*                           
*       EVENT LISTENERS       
*                           
*===========================*/

/*RESET BUTTON*/
reset_btn.addEventListener('click', () => {
    // Resetting the input fields
    input_fields.forEach(input => {
        input.value = '';
    });
    
    // Resetting the tip buttons
    tip_buttons.forEach(btn => {
        btn.style.backgroundColor = '';
    });

    // Resetting the custom tip input
    custom_tip_input.value = '';
    custom_tip_input.style.backgroundColor = '';
    tip_amount_element.textContent = '$0.00';
    total_amount_element.textContent = '$0.00';

    // Resetting our JS variables
    num_of_people = bill_amount = tip_percentage = tip_amount = total_amount = 0;
    checkRestriction();
});

/*NUMBER OF PEOPLE INPUT*/
input_fields[1].addEventListener('input', () => {
    // IF INPUT IS LESS THAN 0, SET IT TO 0
    if (input_fields[1].value < 0) {
        input_fields[1].value = 0;
    }
    // IF INPUT IS 0, SHOW ERROR MESSAGE
    if (input_fields[1].value === '0') {
        document.querySelector('span').style.visibility = 'visible';
        input_fields[1].style.outline = 'solid red';
        input_fields[1].style.borderRadius = '0.1rem';
        // input_fields[1].style.outline = '2px solid red';
        return;
    } else {
        document.querySelector('span').style.visibility = 'hidden';
        input_fields[1].style.outline = '';
        input_fields[1].style.borderRadius = '';
    }
    // SET THE NUM_OF_PEOPLE VARIABLE TO THE INPUT VALUE
    num_of_people = parseInt(input_fields[1].value);
    checkRestriction();
});

/*BILL INPUT*/
input_fields[0].addEventListener('input', () => {
    // IF INPUT IS LESS THAN 0, SET IT TO 0
    if (input_fields[0].value < 0) {
        input_fields[0].value = 0;
        return;
    }
    // SET THE TIP_AMOUNT VARIABLE TO THE INPUT VALUE
    bill_amount = parseFloat(input_fields[0].value);
    checkRestriction();
});

/*TIP BUTTONS*/
tip_buttons.forEach(button => {
    button.addEventListener('click', () => {
        // RESET BUTTONS BACKGROUND COLOR
        tip_buttons.forEach(btn => {
            btn.style.backgroundColor = '';
        });
        button.style.backgroundColor = 'var(--Strong-cyan)';
        custom_tip_input.style.backgroundColor = '';
        custom_tip_input.value = '';
        // IF BUTTON TEXT CONTENT IS NOT EMPTY, SET TIP_PERCENTAGE TO BUTTON TEXT CONTENT
        if (button.textContent !== '') {
            tip_percentage = parseFloat(button.textContent) / 100;
            console.log(tip_percentage);
            checkRestriction();
        }
    });
});

/*CUSTOM TIP INPUT*/
custom_tip_input.addEventListener('click', () => {
    tip_buttons.forEach(btn => {
        btn.style.backgroundColor = '';
    });
    custom_tip_input.style.backgroundColor = 'var(--Strong-cyan)';
    checkRestriction();
});
custom_tip_input.addEventListener('input', () => {
    // IF INPUT IS LESS THAN 0, SET IT TO 0
    if(custom_tip_input.value === '') {
        tip_percentage = 0;
        return;
    }
    if (custom_tip_input.value < 0) {
        custom_tip_input.value = 0;
        return;
    }
    // SET THE TIP_PERCENTAGE VARIABLE TO THE INPUT VALUE
    tip_percentage = parseFloat(custom_tip_input.value) / 100;
    console.log(tip_percentage);
    checkRestriction();
});

/*===========================
*   FUNCTIONS
*===========================*/
/*DISABLES RESET BUTTON AND ENABLES IT AS WELL*/
function checkRestriction() {
    // Conditioning Styles for the reset button
    if (num_of_people === 0 && bill_amount === 0 && tip_percentage === 0) {
        reset_btn.style.backgroundColor = 'var(--Disabled-cyan)';
        reset_btn.style.cursor = 'not-allowed';
        reset_btn.disabled = true;
        return;
    } else {
        reset_btn.style.backgroundColor = '';
        reset_btn.style.cursor = 'pointer';
        reset_btn.disabled = false;
        reset_btn.classList.add('hover');
    }
    // Allowing the calculation to be done conditionally
    if(num_of_people === 0 || bill_amount === 0 || tip_percentage === 0) {
        // Reset the outputs
        tip_amount_element.textContent = '$0.00';
        total_amount_element.textContent = '$0.00';
        return;
    }
    doCalculation();
}
function doCalculation() {
    tip_amount = (bill_amount * tip_percentage) / num_of_people;
    total_amount = (bill_amount / num_of_people) + tip_amount;
    tip_amount_element.textContent = `$${tip_amount.toFixed(2)}`;
    total_amount_element.textContent = `$${total_amount.toFixed(2)}`;
}
checkRestriction();