module.exports = printReceipt;


function checkExist(barcode, array) {
	var found = false;
	for(var i = 0; i < array.length; i++) {
	    if (array[i].Name == barcode) {
	        found = true;
	        break;
	    }
	}
};

function printReceipt (inputs) {

	var message = "";
    message += '***<没钱赚商店>购物清单***\n';
    var analyzed = [];
    var total = 0;

    for (var product in inputs) {
        if(!checkExist(product['barcode'], analyzed)) {
            analyzed.push({
                barcode: product['barcode'],
                name: product['name'],
                unit: product['unit'],
                price: product['price'],
                number: 1,
                total: product['price']
            });
            
        }
        else {
        	for (var i in analyzed) {
			     if (analyzed[i]['barcode'] == barcode) {
			        analyzed[i]['number'] = number+1;
			        analyzed[i]['total'] = total+analyzed[i]['price'];
			        break; //Stop this loop, we found it!
			     }
		   	}
        
        }
    }
    for (var product in analyzed) {
        message += '名称：' + product['name'] + '，数量：' + product['number'] + product['unit'] + "，单价：" + product['price'] + "(元)，小计：" + product['total'] +'(元)\n';
        total += product['total'];
    }
//

    message += '----------------------\n';
    message += '总计：' + total + '(元)\n';


    message += '**********************';
    return message;
};


