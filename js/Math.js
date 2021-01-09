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
{  let transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
   return 1-1/(1+0.005*parseInt(node.value)*transStatChance*parseInt(document.getElementById('SystemEstimate').value));
}

function clickables(node)
   {
      let transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
      return 1-1/(1+0.0005*parseInt(node.value)*transStatChance*parseInt(document.getElementById('SystemEstimate').value));
   }

function Haste(node)
   {
      let transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
      return ((1-1/(1+0.005*parseInt(node.value)*transStatChance*parseInt(document.getElementById('SystemEstimate').value)))*9+1);
   }

function linear(node)
   {
      let transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);
      return parseInt(node.value)*5*transStatLinear+100
   }

function tenx(node)
   {
      let transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);
      return parseInt(node.value)*10*transStatLinear+100
   }

function aa(node)
   {
      let transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);

      let aadmg= parseInt(node.value)*20*parseInt(transStatLinear)+100
      if(document.getElementById('KEActive').checked==1)
      aadmg=Math.pow(aadmg/100, 4)*100;
      return aadmg
   }

function PSDuration(node)
   {
      let transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
      return parseInt(node.value)*60*.05*transStatChance
   }


function itemAverage()
   {
      //get the list of items in an array
      let items=document.getElementsByClassName('items');
      let sum=0;
      for(let i=0;i<8;i++)
         {
            sum=sum+parseInt(items[i].innerHTML)/100;
         }
      let average=sum/8;
      return average;
   }
//overall gold multipliers for per zone and per 5s. Takes into account GB and Click value if you have it selected.
function goldMult()
   {
      let goldPerFive;
      let goldPerZone;
      //per 5s for clickables
      //2monsters*click_chance*Click_gold*Monster_Gold*Gold_Recieved
      goldPerFive= 2*parseFloat(document.getElementsByClassName('Gp display')[0].innerHTML)*(parseInt(document.getElementsByClassName('Gc display')[0].innerHTML)/100)*(parseInt(document.getElementsByClassName('G display')[0].innerHTML)/100)*(parseInt(document.getElementsByClassName('Gb display')[0].innerHTML)/100);
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


//number of ascensions within expected system result.
function ascensions()
{
   total=parseInt(document.getElementsByClassName('Sp')[0].innerHTML);
   total=total-document.getElementById('ImpAscend').value;
   total=total/156;
   total=document.getElementById('SystemEstimate').value/total;
   document.getElementById('asc_count').innerHTML=total;
}

function collectMultipliers()
    {
        let MultipliersBase=1;
        let MultipliersSystem=1;
        let MultipliersTrans=1;
        let DefaultMults=1;
        let multCount=2;
        //every build should include items crit chance and haste, so factoring these in by default.
        DefaultMults=itemAverage();
        DefaultMults=DefaultMults*parseFloat(document.getElementsByClassName('H display')[0].innerHTML)*(1+(parseFloat(document.getElementsByClassName('Cc display')[0].innerHTML)*parseFloat(document.getElementsByClassName('Cd display')[0].innerHTML)/100));
        //the boolean 'checked' returns a 1 or 0. This provides a way to do a pseudo 'if' in the formula itself
        let goldMulti=parseFloat(document.getElementById('GoldPerZone').innerHTML)*document.getElementById('treasure').checked+parseFloat(document.getElementById('GoldPerFive').innerHTML)*document.getElementById('clickable').checked*7.2;
        //Loop through the checkboxes to get the multipliers the person is interested in.
        for(let i=0; i<document.getElementsByClassName('box').length;  i++)
        {   let thisCheckbox=document.getElementsByClassName('box')[i];
            if(thisCheckbox.checked==1)
            {   //we'll need to know the number of multipliers for the trans overall stat
                multCount++;
                MultipliersBase=MultipliersBase*(parseFloat(document.getElementsByClassName(thisCheckbox.classList[0]+' display')[0].innerHTML)/100);
            }
        }
        //total multipliers per system
        MultipliersSystem=MultipliersBase*DefaultMults;
        //factor in gold based on which value was selected at top of page.
        MultipliersSystem=MultipliersSystem*goldMulti;
        //writes it to the page
        document.getElementById('mult_sys').innerHTML=MultipliersSystem/parseFloat(document.getElementsByClassName('Ir display')[0].innerHTML);
        //total multipliers per trans. As you are getting stat*asc, we can abreviate the math to be asc^multipliers
        MultipliersTrans=MultipliersBase*DefaultMults*Math.pow(parseFloat(document.getElementById('asc_count').innerHTML),multCount);
        //account for the item multipliers.
        //MultipliersTrans=MultipliersTrans*parseFloat(document.getElementById('asc_count').innerHTML);

        //Boolean check for the multipliers to count for gold. Similar to the one above
        //makes it so that I am increasing the power based on whether they are using clickable or treasure and if they have CV or GB.
        //CV adds 
        let boolCheck=(2+document.getElementById('GB').checked*2)*document.getElementById('treasure').checked+(3+document.getElementById('Click_Value').checked)*document.getElementById('clickable').checked;
        MultipliersTrans=MultipliersTrans*goldMulti*Math.pow(parseFloat(document.getElementById('asc_count').innerHTML), boolCheck)/parseFloat(document.getElementsByClassName('Ir display')[0].innerHTML);
        document.getElementById('mult_trans').innerHTML=MultipliersTrans.toExponential(2);


    }

    function systemValues()
    {
        
        let currentCrumbs=BigInt(1);
        let difficulty=BigInt(1);
        let diff=0;
        let system=document.getElementById('SystemEstimate').value;
        let worldCrumb=BigInt(11);
        let worldMult=BigInt(10);
        //crumb per world calculation
        //10(1.1^world - 1.1^(world -1))
        //this is a sequende, therefore n/2(a1+an)
        //a1 is always 1; an is the gains from the last world = 10(1.1^world - 1.1^(world -1))
        //I want to use BigInt, therefore 'simplified' to (11^n-10^(n))/10^(n-1)
        //calculating 11^(n-1) and 10^(n-1)
        
                worldCrumb=worldCrumb**(BigInt(system)*30n)
                worldMult=worldMult**(BigInt(system)*30n-1n)

        //source for the formula of sumation of series of powers
        //https://www.wolframalpha.com/examples/mathematics/calculus-and-analysis/sums/
        currentCrumbs=(worldCrumb-worldMult*10n)/worldMult
        //-worldCrumb*10n

        /*
        else
        {
            for(let j=estimatedSys*30-1;j>document.getElementById('SystemEstimate').value*30-1;j--)
            {   
                currentCrumbs=currentCrumbs-10*(Math.pow(1.1, j)-Math.pow(1.1, j-1));
            }
        }*/
        //bigint values are INT, but since I'm setting the min to ss5, the value 16.449 should be the result for ss1  3,034 for ss2
        currentCrumbs=currentCrumbs/10n
        
        //getting difficulty
        //if(difficulty>3000)
        //{   difficulty=BigInt(difficulty)
            //if(diff>0)
        //{
            /*let dividerer=BigInt(1)
            for(let i=0; i<system; i++)
            {   */
                difficulty=multiplier**BigInt((system*30)-1);
                dividerer=divider**BigInt((system*30)-1);
            //}
            difficulty=difficulty/dividerer;
        /*}
        else
        {
            for(let i=estimatedSys*30;i>document.getElementById('SystemEstimate').value*30;i--)
            {
                difficulty=difficulty/116n;
                //difficulty=difficulty*100n;

            }
        }*/
        //}
        /*else{
        if(diff>0)
        {for(let i=estimatedSys*30; i<document.getElementById('SystemEstimate').value*30; i++)
            {
                difficulty=difficulty*1.16;
            }
        }
        else
        {
            for(let i=estimatedSys*30;i>document.getElementById('SystemEstimate').value*30;i--)
            {
                difficulty=difficulty/1.16;
            }
        }}
        estimatedSys=document.getElementById('SystemEstimate').value*/
        diff=difficulty/currentCrumbs;
        diff=diff.toString();
        document.getElementById('differenceExp').innerHTML=diff.length-1;
        document.getElementById('needed').innerHTML=diff.slice(0,1)+'.'+diff.slice(1,3);
        difficulty=difficulty.toString();
        document.getElementById('sysDiffExp').innerHTML=difficulty.length-1;
        difficulty=difficulty.slice(0,1)+'.'+difficulty.slice(1,3);
        document.getElementById('systemdiff').innerHTML=difficulty;
        currentCrumbs=currentCrumbs.toString()
        document.getElementById('CrumbExp').innerHTML=currentCrumbs.length-1;
        currentCrumbs=currentCrumbs.slice(0,1)+'.'+currentCrumbs.slice(1,3);
        document.getElementById('crumbsMult').innerHTML=currentCrumbs;
        
    }

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

