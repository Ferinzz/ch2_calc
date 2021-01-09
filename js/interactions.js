/* Listeners needed:
    clear
   1. imp asc change
   2. system change
   3. node levels added
   4. tab upgrades added
*/

var estimatedSys=0;
var multiplier=116n;
var divider=100n;

//Import listener
document.getElementsByClassName('Import')[0].addEventListener("mouseup", importTree, false)


//Functions for the individual listeners to call so they increment the stats by their value.
function makeChangeChance()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=chance(this);
    WriteGoldMults();
    collectMultipliers();
}

function makeChangeClickable()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=clickables(this);
    WriteGoldMults();
    collectMultipliers();
}

function makeChangeHaste()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=Haste(this);
    collectMultipliers();
}

function makeChangeLinear()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=linear(this);
    WriteGoldMults();
    collectMultipliers();
}

function makeChangetenx()
{
    document.getElementsByClassName(this.id+' display')[0].innerHTML=tenx(this);
    collectMultipliers();
}

function makeChangeAa()
{
    document.getElementsByClassName('Aa display')[0].innerHTML=aa(document.getElementById('Aa'));
    collectMultipliers();
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
    document.getElementsByClassName('chance')[i].addEventListener("input", makeChangeChance, false) ;
}

document.getElementById('Gp').addEventListener("input", makeChangeClickable, false) ;
document.getElementById('H').addEventListener("input", makeChangeHaste, false) ;

//Add listener for all linear changes.
for (let i = 0; i < document.getElementsByClassName('linear').length; i++) {
    const element = document.getElementsByClassName('linear');
    document.getElementsByClassName('linear')[i].addEventListener("input", makeChangeLinear, false) ;
}
//Add listener for all 10x changes.
for (let i = 0; i < document.getElementsByClassName('10x').length; i++) {
    const element = document.getElementsByClassName('10x');
    document.getElementsByClassName('10x')[i].addEventListener("input", makeChangetenx, false) ;
}


document.getElementById('Aa').addEventListener("input", makeChangeAa, false) ;
document.getElementById('Pt').addEventListener("input", makeChangePSDuration, false) ;


document.getElementById('SystemEstimate').addEventListener('input', sysChange, false);
document.getElementById('ImpAscend').addEventListener('input', sysChange, false);
function sysChange()
    {
        ascensions();
        collectMultipliers();
        systemValues();
    }


document.getElementsByName('gold_type')[0].addEventListener('change', collectMultipliers, false);
document.getElementsByName('gold_type')[1].addEventListener('change', collectMultipliers, false);
document.getElementById('Click_Value').addEventListener("input", WriteGoldMults, false) ;
document.getElementById('GB').addEventListener("input", WriteGoldMults, false) ;
document.getElementById('KEActive').addEventListener("input", makeChangeAa, false) ;

document.getElementsByName('damage_type')[0].addEventListener('change', damageSelect, false);
document.getElementsByName('damage_type')[1].addEventListener('change', damageSelect, false);

function damageSelect()
{
    if(document.getElementById('auto').checked==false)
        {document.getElementsByClassName('Aa box')[0].checked=false;
        document.getElementsByClassName('Aa box')[0].indeterminate=true;
        for(let i=0; i<document.getElementsByClassName('click').length; i++)  {
            document.getElementsByClassName('click')[i].indeterminate=false;
        }}
   else{let ClickList=document.getElementsByClassName('click');
        for(let i=0; i<document.getElementsByClassName('click').length; i++)  {
            document.getElementsByClassName('click')[i].checked=false;
            document.getElementsByClassName('click')[i].indeterminate=true;
        }
        
            document.getElementsByClassName('Aa box')[0].indeterminate=false;
        }
        
}
damageSelect()
for (let i = 0; i < document.getElementsByClassName('box').length; i++) {
    const box = document.getElementsByClassName('box')[i];
    document.getElementsByClassName('box')[i].addEventListener('input', changeSelects, false)
    
}
function changeSelects()
{   
    damageSelect();
    collectMultipliers();
}
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
    systemValues();
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
 
 document.getElementsByClassName("Total")[0].innerHTML = total;
 document.getElementsByClassName("Sp")[0].innerHTML = Sp;
 ascensions();
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
    collectMultipliers();
    
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





    
        //Crumbs multiplier
        //sum of crumbs gained per system will be the easiest assumption, so it goes up to the completion of the estimated system.
        //systemx30 in total. 
        //As this is the sum of each world, there needs to be a loop... yay? Another option is that once this is done once, I can make it only update when the system count changes. with a + or - of the current value.

    //cycle over the entire node list from the reference and output the fully allocated skill tree string
    //this is modified loop from the importTree
    function fullTree()
    {  clearInputs()
       //First we need the reference file... It be big(92KB) so many clients would cringe... Maybe just have this as a constant imported on load I guess.
    
       let fullstring='';
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

     importTree()
     //&2&3&4&6&5&14&11&8&7&33&50&51&194&201&199&146&190&191&192&143&210&209&208&207&148&15&37&52&53&228&226&147&237&270&234&235&274&153&202&175&181&141&240&243&245&216&157&220&219&218&272&271&158&277&156&217&213&182&152&206&203&259&250&248&254&255&133&253&134&196&195&131&186&279&135&372&409&403&295&340&367&339&314&368&343&390&313&380&386&385&440&391&344&331&315&12&30&48&49&124&79&80&659&81&108&643&105&120&447&450&644&645&290&451&627&656&71&469&628&629&97&449&95&94&461&66&70&69&658&467&67&65&64&460&113&121&91&281&453&93&92&442&90&62&110&112&445&211&212&138&214&251&111&107&102&106&468

