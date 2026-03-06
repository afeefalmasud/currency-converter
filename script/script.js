const selects = document.querySelectorAll('.drop-down select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from-content select');
const toCurr = document.querySelector('.to-content select');
const msg = document.querySelector('.msg p');

for(const select of selects){
    for(const code in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === 'from' && code ==='USD'){
            newOption.selected = 'selected';
        }
        else if(select.name === 'to' && code ==='BDT'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change',(event) => {
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}
btn.addEventListener('click', async (event) =>{
    event.preventDefault();
    let amount = document.querySelector('.intro input');
    let amtValue = amount.value;
    if(amtValue ==='' || amtValue<1){
        amtValue = 1;
        amount.value = '1';
    }
    const url = `https://v6.exchangerate-api.com/v6/9ac18f468f6ccf737ff0766d/pair/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.conversion_rate;
    let finalAmt = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
})