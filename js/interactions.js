/* Listeners needed:
    clear
   1. imp asc change
   2. system change
   3. node levels added
   4. tab upgrades added
*/

var estimatedSys=0;
var multiplier=BigInt(Math.pow(116,30))
var divider=BigInt(Math.pow(100,30))

//Import listener
document.getElementsByClassName('Import')[0].addEventListener("mouseup", importTree, false)


//Functions for the individual listeners to call so they increment the stats by their value.
function makeChangeChance()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=chance(this);
    WriteGoldMults()
    collectMultipliers()
}

function makeChangeClickable()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=clickables(this);
    WriteGoldMults()
    collectMultipliers()
}

function makeChangeHaste()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=Haste(this);
    collectMultipliers()
}

function makeChangeLinear()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=linear(this);
    WriteGoldMults()
    collectMultipliers()
}

function makeChangetenx()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=tenx(this);
    collectMultipliers()
}

function makeChangeAa()
{
    document.getElementsByClassName('Aa display')[0].innerHTML=aa(document.getElementById('Aa'));
    collectMultipliers()
}

function makeChangePSDuration()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=PSDuration(this);
}


//input change listener.
//loop functions go through all the inputs of each type to add in the listeners.
//Add listener for all  chance.
for (let i = 0; i < document.getElementsByClassName('chance').length; i++) {
    const element = document.getElementsByClassName('chance');
    document.getElementsByClassName('chance')[i].addEventListener("input", makeChangeChance, false) 
}

document.getElementById('Gp').addEventListener("input", makeChangeClickable, false) 
document.getElementById('H').addEventListener("input", makeChangeHaste, false) 

//Add listener for all linear changes.
for (let i = 0; i < document.getElementsByClassName('linear').length; i++) {
    const element = document.getElementsByClassName('linear');
    document.getElementsByClassName('linear')[i].addEventListener("input", makeChangeLinear, false) 
}
//Add listener for all 10x changes.
for (let i = 0; i < document.getElementsByClassName('10x').length; i++) {
    const element = document.getElementsByClassName('10x');
    document.getElementsByClassName('10x')[i].addEventListener("input", makeChangetenx, false) 
}


document.getElementById('Aa').addEventListener("input", makeChangeAa, false) 
document.getElementById('Pt').addEventListener("input", makeChangePSDuration, false) 


document.getElementById('Click_Value').addEventListener("input", WriteGoldMults, false) 
document.getElementById('GB').addEventListener("input", WriteGoldMults, false) 
document.getElementById('KEActive').addEventListener("input", makeChangeAa, false) 


/*
Values reference nodes individually, which will reference the key of an object
1&2&3&4&6&5&14&8&11&7&33&50&51&194&201&199&146&190&191&192&143&210&209
50 is a key to an object with val : V stat which is automator points
1 is a key to an object with val : T1 which is a Trait stat unlocking Big Clicks
Q references the flammables

Requireents for use
Function to recognise the & symbol and run over the string as few times as possible.
save the 'last' location for the loop to check the value between it and the next &
save presence of following & as starting point for next loop
LOL Split does all this in one line LOLOLOLOLOLOL

Mothods to increment
Rename classes/ids to match the file?
Will need to change multiple values in my html based on the changes by devs
make a switch in the incrementing function to determine the correct class based on reference file?
Will need to change switch function of particular node type if changes are made by devs
First option is less processor intensive, but still need multiple functions depending on the node level
Can use the function to fill in the input fields, and then use the refresh loop to convert to damage mods

*/

/*
Because of the structure of their objects... I have to search for a key to know where to get the val
I COULD just redo a table based on the data, but this way if they update the tree I only need to 
redo my file... Unless the structure changes.
*/
function findKey(array, key) {
    for (var i = 0; i < array.length; i++) {
        if (Object.keys(array[i])[0] === key) {
            return i;
        }
    }
    return null;
 }
 
 function importTree()
 {  clearInputs()
    //First we need the reference file... It be big(92KB) so many clients would cringe... Maybe just have this as a constant imported on load I guess.
 
    //"imports" the string and separates into an array at every &
    mySkillTree=document.getElementById('Import').value;
    mySkillTree=mySkillTree.split('&');
    //We now have an array of all the nodes that have been selected. Easy to iterate over.
    //forEach() is a fast easy way to iterate over the whole array and call another function
    //Order doesn't matter, but sorting the array requires reading it multiple times and modifying it each time
    //Less calcs to just find the object
    mySkillTree.forEach(element => {
       //write the increment function here
       //This should increment each input.value by the node level
       //step one get val based on reference and determine the input to modify as well as how much based on val
       var val=findKey(reference.nodes, element)
       switch (reference.nodes[val][element].val) {
          case "G":
          case "Cc":
          case "Cd":
          case "H":
          case "Gc":
          case "Cl":
          case "Gb":
          case "Ir":
          case "Mt":
          case "Mr":
          case "En":
          case "Gp":
          case "Bg":
          case "Tc":
          case "Tg":
          case "I1":
          case "I2":
          case "I3":
          case "I4":
          case "I5":
          case "I6":
          case "I7":
          case "I8":
          case "Mu":
          case "Bc":
          case "Bd":
          case "Hd":
          case "Md":
          case "Ea":
          case "Pt":
          case "Pa":
          case "Ra":
          case "Aa":
             {//document.getElementById(reference.nodes[element-1][element].val).stepUp()
                idName=reference.nodes[val][element].val;
             document.getElementById(idName).stepUp();
             }
             break;
          case "qG":
          case "qCc":
          case "qCd":
          case "qH":
          case "qGc":
          case "qCl":
          case "qGb":
          case "qIr":
          case "qMr":
          case "qEn":
          case "qGp":
          case "qBg":
          case "qTc":
          case "qTg":
          case "qMu":
          case "qBc":
          case "qBd":
          case "qHd":
          case "qMd":
             {//document.getElementById(reference.nodes[element-1][element].val).stepUp()
                idName=reference.nodes[val][element].val.slice(1);
                document.getElementById(idName).stepUp(3);
                }
             break;
             case "qMt":
                {//document.getElementById(reference.nodes[element-1][element].val).stepUp()
                   idName=reference.nodes[val][element].val.slice(1);
                   document.getElementById(idName).stepUp(4);
                   }
          default:
             break;
       }
       
       
 
 
    });
 
    
    //Used to get the total points spent to build the tree. each node is one value in the array
    Sp=mySkillTree.length;
    //calls the function which will call the refresh and count total values.
    refreshLoop(total=0,Sp)
    return;
 }
 
 
  
 
 /*
 Loops over the page to add in the values using the formulas above.
 */

 function refreshLoop(total,Sp){
    var transStatLinear = Math.pow(1.1, document.getElementById('TransLinear').value);
     var transStatChance = Math.pow(1.1, document.getElementById('TransChance').value);
    //Basic loop function to update when user adds their specific data and after import
    var fillin;
 
    for(var i=0; i<document.getElementsByClassName('linear').length; i++)
        { 
           var node=document.getElementsByClassName('linear')[i];
           fillin=document.getElementsByClassName('linear')[i].id+' display';
          document.getElementsByClassName(fillin)[0].innerHTML=linear(node);
           total+=parseInt(node.value)
         }
 
     for(var i=0; i<document.getElementsByClassName('10x').length; i++)
        {  fillin=0;
              var node=document.getElementsByClassName('10x')[i];
              fillin=document.getElementsByClassName('10x')[i].id+' display';
               document.getElementsByClassName(fillin)[0].innerHTML=tenx(node);
               total+=parseInt(node.value);
         }
 
 //Auto-Attacks gets something special
     var node=document.getElementsByClassName('aa')[0];
     document.getElementsByClassName('Aa display')[0].innerHTML=aa(node);
     total+=parseInt(node.value);
 
 //sustained powersurge is something special
     var node=document.getElementsByClassName('PSduration')[0];
    document.getElementsByClassName('Pt display')[0].innerHTML=PSDuration(node);
    total+=parseInt(node.value);
 
 //extra click count is special
    for(var i=0; i<document.getElementsByClassName('singles').length; i++)
    {
        var node=document.getElementsByClassName('singles')[i];
        fillin=document.getElementsByClassName('singles')[i].id+' display';
        document.getElementsByClassName(fillin)[0].innerHTML=node.value;
        total+=parseInt(node.value);
     }
 
 //All the % chance diminishing returns things are gonna have the estimated system factored into it.
 //Treasure Chance Tc/crit chance Cc/ICR Ir/bonus gold Bg 1-1/(1+0.005*node.value*transStat*)
 for(var i=0; i<document.getElementsByClassName('chance').length; i++)
     {
       var node=document.getElementsByClassName('chance')[i];
        fillin=document.getElementsByClassName('chance')[i].id+' display';
       document.getElementsByClassName(fillin)[0].innerHTML=chance(node);
       total+=parseInt(node.value);
     }
 
 //clickables chance Gp 1-1/(1+0.0005*B7)
 
     var node=document.getElementById('Gp');
     document.getElementsByClassName('Gp display')[0].innerHTML=clickables(node);
     total+=parseInt(node.value);
 
 //haste H (1-1/(1+0.005*Haste))*9+1)
 
     var node=document.getElementById('H');
     document.getElementsByClassName('H display')[0].innerHTML=Haste(node);
     total+=parseInt(node.value);
 
 WriteGoldMults();
 document.getElementsByClassName("Total")[0].innerHTML = total;
 document.getElementsByClassName("Sp")[0].innerHTML = Sp;
 ascensions();
 collectMultipliers();

 }
 
 
 //This function is called at the end of refresh to output the totals
 function changeTotal(Sp,total){
    document.getElementsByClassName("Total")[0].innerHTML = total;
    document.getElementsByClassName("Sp")[0].innerHTML = Sp;
    ascensions();
    }

function WriteGoldMults(){
    
    var gold=goldMult()
    document.getElementById("GoldPerZone").innerHTML = gold[0];
    document.getElementById("GoldPerFive").innerHTML = gold[1];
    
    }
 
 /*Could I make a CSV export? Maybe, but also fuck CSV.
 
 */
 
 
 /*Need a clear input loop to... clear inputs lol*/
 //or... Could use it as a way to easily duplicate across several ascension :thinking:
 //My own feature bug...
 
 function clearInputs()
    {
       //Hopefully this will be simple.
       //Get all inputs... After the first ones and clear them
       //Make an array, buffer past the initial ones then clear it all
       //Could add another class as a filter?
 
       var allInputs=document.getElementsByClassName('nodeLvl')
       for(i=0; i<allInputs.length; i++)
       {
          allInputs[i].value=0;
       }
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
        DefaultMults=DefaultMults*parseFloat(document.getElementsByClassName('H display')[0].innerHTML)*parseFloat(document.getElementsByClassName('Cc display')[0].innerHTML)*parseFloat(document.getElementsByClassName('Cd display')[0].innerHTML)/100;
        //the boolean 'checked' returns a 1 or 0. This provides a way to do a pseudo 'if' in the formula itself
        let goldMulti=parseInt(document.getElementById('GoldPerZone').innerHTML)*document.getElementById('treasure').checked+parseInt(document.getElementById('GoldPerFive').innerHTML)*document.getElementById('clickable').checked;
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
        MultipliersSystem=parseInt(MultipliersSystem*goldMulti*7.2);
        //writes it to the page
        document.getElementById('mult_sys').innerHTML=MultipliersSystem;
        //total multipliers per trans. As you are getting stat*asc, we can abreviate the math to be asc^multipliers
        MultipliersTrans=MultipliersBase*DefaultMults*Math.pow(parseFloat(document.getElementById('asc_count').innerHTML),multCount);
        //account for the item multipliers.
        MultipliersTrans=MultipliersTrans*(Math.pow(parseFloat(document.getElementById('asc_count').innerHTML),8))

        //Boolean check for the multipliers to count for gold. Similar to the one above
        //makes it so that I am increasing the power based on whether they are using clickable or treasure and if they have CV or GB.
        //CV adds 
        let boolCheck=(2+document.getElementById('GB').checked*2)*document.getElementById('treasure').checked+(3+document.getElementById('Click_Value').checked)*document.getElementById('clickable').checked;
        MultipliersTrans=MultipliersTrans*goldMulti*Math.pow(parseFloat(document.getElementById('asc_count').innerHTML), boolCheck)*(1+7.2*document.getElementById('clickable').checked)
        document.getElementById('mult_trans').innerHTML=MultipliersTrans;


    }

function writeDifficulty()
    {
        document.getElementById('systemdiff').innerHTML=Math.pow(1.16, document.getElementById('SystemEstimate').value*30)
    }

    
        //Crumbs multiplier
        //sum of crumbs gained per system will be the easiest assumption, so it goes up to the completion of the estimated system.
        //systemx30 in total. 
        //As this is the sum of each world, there needs to be a loop... yay? Another option is that once this is done once, I can make it only update when the system count changes. with a + or - of the current value.
function systemValues()
    {
        
        let currentCrumbs=BigInt(1);
        let difficulty=BigInt(1);
        let diff=document.getElementById('SystemEstimate').value*30-estimatedSys*30;
        let system=document.getElementById('SystemEstimate').value;
        let worldCrumb=BigInt(11);
        let worldMult=BigInt(10);
        console.log(diff);
        //crumb per world calculation
        //10(1.1^world - 1.1^(world -1))
        //this is a sequende, therefore n/2(a1+an)
        //a1 is always 1; an is the gains from the last world = 10(1.1^world - 1.1^(world -1))
        //I want to use BigInt, therefore 'simplified' to (11^n-11^(n-1))/10^(n-1)
        //calculating 11^(n-1) and 10^(n-1)
        
                worldCrumb=worldCrumb**(BigInt(system)*30n-1n)
                worldMult=worldMult**(BigInt(system)*30n-1n)

            console.log(BigInt(system)*30n)
        //Now we have the base stats and we can plug them into the formula
        currentCrumbs=((worldCrumb*11n-worldCrumb)/worldMult)


        /*
        else
        {
            for(let j=estimatedSys*30-1;j>document.getElementById('SystemEstimate').value*30-1;j--)
            {   
                currentCrumbs=currentCrumbs-10*(Math.pow(1.1, j)-Math.pow(1.1, j-1));
            }
        }*/
        currentCrumbs=currentCrumbs/10n+1n
        document.getElementById('crumbsMult').innerHTML=currentCrumbs;
        
        //getting difficulty
        //if(difficulty>3000)
        //{   difficulty=BigInt(difficulty)
            //if(diff>0)
        //{
            let dividerer=BigInt(1)
            for(let i=0; i<system; i++)
            {   
                difficulty=difficulty*multiplier;
                dividerer=dividerer*divider;
            }
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
        }}*/
        estimatedSys=document.getElementById('SystemEstimate').value
        document.getElementById('systemdiff').innerHTML=difficulty;
        //Number.parseFloat(difficulty).toExponential(2)
    }

    //cycle over the entire node list from the reference and output the fully allocated skill tree string
    //this is modified loop from the importTree
    function fullTree()
    {  clearInputs()
       //First we need the reference file... It be big(92KB) so many clients would cringe... Maybe just have this as a constant imported on load I guess.
    
       let fullstring='';
       //"imports" the string and separates into an array at every &
       //We now have an array of all the nodes that have been selected. Easy to iterate over.
       //forEach() is a fast easy way to iterate over the whole array and call another function
       //Order doesn't matter, but sorting the array requires reading it multiple times and modifying it each time
       //Less calcs to just find the object
       reference.nodes.forEach(element => {
          //write the increment function here
          //This should increment each input.value by the node level
          //step one get val based on reference and determine the input to modify as well as how much based on val
          fullstring=fullstring+Object.keys(element)[0]+'&';
          switch (element[Object.keys(element)[0]].val) {
             case "G":
             case "Cc":
             case "Cd":
             case "H":
             case "Gc":
             case "Cl":
             case "Gb":
             case "Ir":
             case "Mt":
             case "Mr":
             case "En":
             case "Gp":
             case "Bg":
             case "Tc":
             case "Tg":
             case "I1":
             case "I2":
             case "I3":
             case "I4":
             case "I5":
             case "I6":
             case "I7":
             case "I8":
             case "Mu":
             case "Bc":
             case "Bd":
             case "Hd":
             case "Md":
             case "Ea":
             case "Pt":
             case "Pa":
             case "Ra":
             case "Aa":
                {//document.getElementById(reference.nodes[element-1][element].val).stepUp()
                   idName=element[Object.keys(element)].val;
                document.getElementById(idName).stepUp();
                }
                break;
             case "qG":
             case "qCc":
             case "qCd":
             case "qH":
             case "qGc":
             case "qCl":
             case "qGb":
             case "qIr":
             case "qMr":
             case "qEn":
             case "qGp":
             case "qBg":
             case "qTc":
             case "qTg":
             case "qMu":
             case "qBc":
             case "qBd":
             case "qHd":
             case "qMd":
                {//document.getElementById(reference.nodes[element-1][element].val).stepUp()
                   idName=element[Object.keys(element)].val.slice(1);
                   document.getElementById(idName).stepUp(3);
                   }
                break;
                case "qMt":
                   {//document.getElementById(reference.nodes[element-1][element].val).stepUp()
                      idName=element[Object.keys(element)].val.slice(1);
                      document.getElementById(idName).stepUp(4);
                      }
             default:
                break;
          }
       
       
 
 
        });
     
        
        //Used to get the total points spent to build the tree. each node is one value in the array
        Sp=reference.nodes.length;
        //calls the function which will call the refresh and count total values.
        refreshLoop(total=0,Sp)
        console.log(fullstring);
        return;
     }