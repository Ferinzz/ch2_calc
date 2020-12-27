//First we need the reference file... It be big(92KB) so many clients would cringe...
//Gonna just import it and save into an array.

const reference=levelGraphObject;

//Let's just declare this thing
let total=0;

//Yeah, that's the only two variables. The rest can be referenced from the page.

//all the formulas
//node is var node=document.getElementsByClassName('set_name')[i]; or var node=document.getElementById('name')
//in other words, node is the value of the input field that calls it.

function chance(node)
{  var transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
   return 1-1/(1+0.005*parseInt(node.value)*transStatChance*parseInt(document.getElementById('SystemEstimate').value));
}

function clickables(node)
   {
      var transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
      return 1-1/(1+0.0005*parseInt(node.value)*transStatChance*parseInt(document.getElementById('SystemEstimate').value));
   }

function Haste(node)
   {
      var transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
      return ((1-1/(1+0.005*parseInt(node.value)*transStatChance*parseInt(document.getElementById('SystemEstimate').value)))*9+1);
   }

function linear(node)
   {
      var transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);
      return parseInt(node.value)*5*transStatLinear+100
   }

function tenx(node)
   {
      var transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);
      return parseInt(node.value)*10*transStatLinear+100
   }

function aa(node)
   {
      var transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);

      var aadmg= parseInt(node.value)*20*parseInt(transStatLinear)+100
      if(document.getElementById('KEActive').checked==1)
      aadmg=Math.pow(aadmg/100, 4)*100;
      return aadmg
   }

function PSDuration(node)
   {
      var transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
      return parseInt(node.value)*60*.05*transStatChance
   }


function itemAverage()
   {
      //get the list of items in an array
      var items=document.getElementsByClassName('items');
      var sum=0;
      for(i=0;i<8;i++)
         {
            sum+=parseInt(items[i].innerHTML);
         }
      var average=(sum/100)/8;
   }
//overall gold multipliers for per zone and per 5s. Takes into account GB and Click value if you have it selected.
function goldMult()
   {
      var goldPerFive;
      var goldPerZone;
      //per 5s for clickables
      goldPerFive= (5*2*parseFloat(document.getElementsByClassName('Gp display')[0].innerHTML)*parseInt(document.getElementsByClassName('Gc display')[0].innerHTML)/100)*(parseInt(document.getElementsByClassName('G display')[0].innerHTML)/100)*(parseInt(document.getElementsByClassName('Gb display')[0].innerHTML)/100);
      goldPerFive=goldPerFive*(1+Math.pow(parseFloat(document.getElementsByClassName('Bg display')[0].innerHTML), 2)*100)
      //adding in clickable value bonuses
      goldPerFive=goldPerFive*(1+parseFloat(document.getElementsByClassName('Tc display')[0].innerHTML)*parseInt(document.getElementsByClassName('Tg display')[0].innerHTML)/100*document.getElementById('Click_Value').checked);
      //per zone for treasure TCC and monster count taken into account.
      goldPerZone= (50*5*parseFloat(document.getElementsByClassName('Tc display')[0].innerHTML)*parseInt(document.getElementsByClassName('Tg display')[0].innerHTML)/100+(50-50*parseFloat(document.getElementsByClassName('Tc display')[0].innerHTML))*parseInt(document.getElementsByClassName('Gb display')[0].innerHTML)/100)*parseInt(document.getElementsByClassName('G display')[0].innerHTML)/100;
      goldPerZone=goldPerZone*(1+parseFloat(document.getElementsByClassName('Bg display')[0].innerHTML*10));
      //Glorious bounty added
      goldPerZone=goldPerZone*(1+parseFloat(document.getElementsByClassName('Gp display')[0].innerHTML)*parseInt(document.getElementsByClassName('Gc display')[0].innerHTML)/100*parseInt(document.getElementsByClassName('Gb display')[0].innerHTML)/100*document.getElementById('GB').checked);
      return [goldPerZone,goldPerFive]
   }

//efficiency calc for exp. Takes the selected multipliers and adds them together, then divide by sp spent
/* will be sum of x/y */



/*
Things needed to factor in
1. Damage type
gold type
2. multiple imports?
4. Account for node level ups? (yuck, thanks god this is going away)
5. Multiple ascension overall multipliers
 imp asc points 'lost'
 add in new variable to store node counts?
 change storage to straight object?

*/

