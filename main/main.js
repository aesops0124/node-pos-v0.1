module.exports = printReceipt;


function checkBarcodeExist(barcodeinstance, array) {
	var found = false;
	for(var i = 0; i < array.length; i++) {
        var barcode = array[i]['Barcode'];
	    if (barcode == (barcodeinstance)) {
	        found = true;
	        break;
	    }
	}
	return found;
};

function printReceipt (inputs) {

	var message = "";
    message += '***<store earning no money>Receipt ***\n';
    var analyzed = [];
    var total = 0;

    for (var i in inputs) {
        if(!checkBarcodeExist(inputs[i]['Barcode'], analyzed)) {
            analyzed.push({
                Barcode: inputs[i]['Barcode'],
                Name: inputs[i]['Name'],
                Unit: inputs[i]['Unit'],
                Price: inputs[i]['Price'],
                Number: 1,
                Subtotal: inputs[i]['Price']
            });
            
        }
        else {
        	for (var j in analyzed) {
			     if (analyzed[j]['Barcode'] == inputs[i]['Barcode']) {
			        analyzed[j]['Number'] += 1;
			        analyzed[j]['Subtotal'] += analyzed[j]['Price'];
			        break;
			     }
		   	}
        }
    }
    for (var k in analyzed) {
        message += 'Name: ' + analyzed[k]['Name'] + ', Quantity: ' + analyzed[k]['Number'] + " ";
        if(analyzed[k]['Number'] < 2)
            message += analyzed[k]['Unit'];
        else
            message += analyzed[k]['Unit'] + "s";
         message += ", Unit price: " + parseFloat(analyzed[k]['Price']).toFixed(2) + " (yuan), Subtotal: " + parseFloat(analyzed[k]['Subtotal']).toFixed(2) + " (yuan)\n";
 
        total += analyzed[k]['Subtotal'];
    }
//

    message += '----------------------\n';
    message += 'Total: ' + parseFloat(total).toFixed(2) + ' (yuan)\n';


    message += '**********************\n';
    return message;
};


