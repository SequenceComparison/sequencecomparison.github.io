var myfiles = [
"BAI.csv",
"GER.csv",
"IDS.csv",
"IEL.csv",
"JAP.csv",
"KSL.csv",
"OUG.csv",
"PAN.csv",
"PIE.csv",
"ROM.csv",
"SIN.csv",
"SLV.csv"
];
var mymodes = ["edit-tokens", "lexstat", "sca", "turchin"];

function storeText(data)
{
  var store = document.getElementById("store");
  store.innerText = data;

  var db = document.getElementById("db");
  //db.innerHTML = store.innerText;
}

function loadFile(url,wait)
{
  $.ajax({
    async: wait,
    type: "GET",
    url: url,
    dataType: "text",
    success: function(data) { storeText(data); }
  });
}

function clearit()
{
  document.getElementById('alm').style.fontWeight="normal";
  document.getElementById('ralm').style.fontWeight="normal";
  document.getElementById('acd').style.fontWeight="normal";
  document.getElementById('racd').style.fontWeight="normal";
  document.getElementById('show').innerHTML = '';
  document.getElementById('puffer').innerHTML = '';
  document.getElementById('msa').innerHTML = '';
  document.getElementById('store').innerText = '';
  document.getElementById('application').style.display="none";
  document.getElementById('browser').style.display="none";
}

function toggleData(source)
{
  clearit();
  document.getElementById('application').style.display = "block";
  var show = document.getElementById("show");
  show.innerHTML = '';
  
  var msa = document.getElementById("msa");
  msa.innerHTML = '';

  var puffer = document.getElementById("puffer");
  puffer.innerHTML = '';

  var db = document.getElementById("db");

  document.getElementById('alm').style.fontWeight="normal";
  document.getElementById('ralm').style.fontWeight="normal";
  document.getElementById('acd').style.fontWeight="normal";
  document.getElementById('racd').style.fontWeight="normal";


  if(source=='alm')
  {
    document.getElementById('alm').style.fontWeight = "bold";

    var text = '<select class="selector" onchange="browseMSA(this.value);" size="30" >';
    loadFile('benchmark/msa/files.csv', false);
    var store = document.getElementById('store');
    var data = store.innerText;
    var lines = data.split('\n');
    for(var i=0; i<lines.length-1;i++)
    {
      text += '<option id="'+lines[i]+'" value="benchmark/msa/'+lines[i]+'" onclick="browseMSA('+"'benchmark/msa/"+lines[i]+"'"+')">'+lines[i]+'</option>';
    }
    text += '</select>';
    
    // assign values to the browser
    var browser = document.getElementById('browser');
    browser.style.display = "block";
    browser.innerHTML = "Browse the Multiple Alignments (Benchmark Data)";
    browser.innerHTML += ' <input type="button" onclick="clearit()" value="CLEAR" />';

    show.innerHTML = text;
  }
  else if(source=="ralm")
  {
    document.getElementById('ralm').style.fontWeight = "bold";
    var text = '<select class="selector" size="12" onchange="selectMSA(this.value)">';
    loadFile('results/msa/analyses.csv', false);
    var store = document.getElementById('store');
    var data = store.innerText;
    var lines = data.split('\n');
    for(var i=0; i<lines.length-1;i++)
    {
      text += '<option value="'+lines[i]+'" onclick="selectMSA('+"'"+lines[i]+"'"+')">'+lines[i]+'</option>';
    }
    text += '</select>';
    
    // assign values to the browser
    var browser = document.getElementById('browser');
    browser.style.display = "block";
    browser.innerHTML = "Browse the Multiple Alignments (Results of the Automatic Analyses)";
    browser.innerHTML += ' <input type="button" onclick="clearit()" value="CLEAR" />';

    show.innerHTML = text;
  }
  else if(source=="acd")
  {
    document.getElementById('acd').style.fontWeight = "bold";
    var text = '<select class="selector" size="12" onclick="browseCSV(this.value)" onchange="browseCSV(this.value)">';
    for(var i=0,f;f=myfiles[i];i++)
    {
      var myfile = 'benchmark/cognates/'+f;
      text += '<option value="'+myfile+'">'+f+'</option>';
    }
    text += '</select>';
    // assign values to the browser
    var browser = document.getElementById('browser');
    browser.style.display = "block";
    browser.innerHTML = "Browse the Cognate Sets (Benchmark Data)";
    browser.innerHTML += ' <input type="button" onclick="clearit()" value="CLEAR" />';

    show.innerHTML = text;
  }
  else if(source=="racd")
  {
    document.getElementById('racd').style.fontWeight = "bold";
    var text = '<select class="selector" size="6" onclick="showCSV(this.value)" onchange="showCSV(this.value)">';
    for(var i=0,f;f=mymodes[i];i++)
    {
      var myfile = 'results/cognates/'+f;
      text += '<option value="'+myfile+'">'+f+'</option>';
    }
    text += '</select>';
    // assign values to the browser
    var browser = document.getElementById('browser');
    browser.style.display = "block";
    browser.innerHTML = "Browse the Cognate Sets (Results of the Automatic Analyses)";
    browser.innerHTML += ' <input type="button" onclick="clearit()" value="CLEAR" />';

    show.innerHTML = text;
  }
}

function showCSV(path)
{
  var show = document.getElementById('puffer');
  var text = '<select class="selector" size="12" onclick="browseCSV(this.value)" onchange="browseCSV(this.value)">';
  for(var i=0,f;f=myfiles[i];i++)
  {
    var myfile = path+'/'+f;
    text += '<option value="'+myfile+'">'+f+'</option>';
  }
  text += '</select>';
  show.innerHTML = text;
}

function browseCSV(url)
{
  loadFile(url, false);
  var store = document.getElementById('store');
  var data = store.innerText;
  var lines = data.split('\n');
  var text = '<table style="border:2px solid black;max-width:900px;">';
  var head = 0;
  for(var i=0,line;line=lines[i];i++)
  {
    if(line[0] != '#')
    {
      if(head != 0)
      {
	text += '<tr style="border:1px solid black;">';
	points = line.split('\t');
	for(var j=0,p; p = points[j];j++)
	{
	  text += '<td style="border:1px solid gray;" class="'+header[j]+'">'+p+'</td>';
	}
	text += '</tr>';
      }
      else
      {
	var headline = line.split('\t');
	var header = {};
	text += '<tr id="headline" style="border:1px solid black;">'
	for(var j=0,h;h=headline[j];j++)
	{
	  header[j] = h;https://sequencecomparison.github.io?msa=evobench_102.msa
	  text += '<th style="font-weight:bold;border:1px solid gray;">'+h+'</th>';
	}
	head = 1;
      }
    }
    else
    {
      if(head != 0)
      {
	text += '<tr style="border:1px solid black;background-color:lightgray;"><td colspan="'+headline.length+'"><hr width="100%" style="color:white;"></td></tr>';
      }
    }
  }

  var show = document.getElementById('msa');
  show.innerHTML = text;
  highLight();
}

function selectMSA(url)
{
  document.getElementById('msa').innerHTML = '';
  var show = document.getElementById('puffer');
  var text = '<select class="selector" size="30" onchange="browseMSA(this.value)">';
  loadFile('results/msa/'+url+'/files.csv', false);
  var store = document.getElementById('store');
  var data = store.innerText;
  var lines = data.split('\n');
  for(var i=0; i<lines.length-1;i++)
  {
    text += '<option value="results/msa/'+url+"/"+lines[i]+'" onclick="browseMSA('+"'results/msa/"+url+"/"+lines[i]+"'"+')">'+lines[i]+'</option>';
  }
  text += '</select>';
  
  show.innerHTML = text;
}

var MSA = {};
MSA['taxa'] = {};
MSA['sequences'] = {};
MSA['ans'] = {};
MSA['width'] = 0;
MSA["type"] = 'basic';
MSA['taxlen'] = 0;

var msa_status = {};
msa_status['parsed'] = false;
msa_status['edited'] = false;
msa_status['mode'] = 'basic';

function browseMSA(url)
{
  MSA['taxa'] = {};
  MSA['sequences'] = {};
  MSA['ans'] = {};
  MSA['width'] = 0;
  MSA["type"] = 'basic';
  MSA['taxlen'] = 0;
  msa_status['parsed'] = false;
  msa_status['edited'] = false;
  msa_status['mode'] = 'basic';
  
  loadFile(url, false);
  var msa = document.getElementById("msa");
  msa.innnerHTML = '';
  parseMSA();
  showMSA(false);
  
}

function parseMSA()
{
  var store = document.getElementById('store');
  var text = store.innerText;
  var display = document.getElementById('msa');
  
  //var db = document.getElementById('db');

  var lines = text.split(/\r\n|\n/);

  /* define a sequence index */
  var sid = 1;

  /* define array of unique sequences */
  var uniques = [];
  var unique_taxa = [];
  var sequences = {};

  for (var i = 0; i < lines.length; i++)
  {
    var start = lines[i].slice(0,1);

    if (start == '#'){}
    else if (start == ':'){} /* nothing for the moment */
    else if (start == '@')
    {
      keyval = lines[i].split(':');
      key = keyval[0].replace(/@/,'');
      val = keyval[1].replace(/^\s*/,'').replace(/\s*$/,'');
      MSA[key] = val;
    }
    else
    {
      taxalignments = lines[i].split('\t');
      if (taxalignments[0].replace(/\./g,'') in keywords)
      {
	      MSA['ans'][taxalignments[0].replace(/\./g,'')] = taxalignments.slice(1,taxalignments.length);
      }
      else if (taxalignments.length == 1)
      {
	      if (i == 0)
	      {
	        MSA['dataset'] = lines[i];
	      }
	      else if (i == 1)
	      {
	        MSA['alignment'] = lines[i];
	      }
      }
      else
      {
	      /* check if MSA is in the typical ID system */
	      if(isNaN(taxalignments[0]))
	      {
          var alignment = taxalignments.slice(1,taxalignments.lenght);
          var taxon = taxalignments[0].replace(/\./g,'')+'_'+sid;
          
          /* modify taxon length */
          if(taxalignments[0].length > MSA['taxlen']){MSA['taxlen'] = taxalignments[0].length;}

          var sequence = alignment.join('').replace(/-/g,'');

          MSA['taxa'][taxon] = alignment;

          if(alignment.length > MSA['width']){MSA['width'] = alignment.length;}

          var idx = uniques.indexOf(sequence);
          if(idx == -1)
          {
            var tmp_taxa = [taxon];
            sequences[sequence] = tmp_taxa;
            uniques.push(sequence);
            unique_taxa.push(taxon);
          }
          else
          {
            sequences[sequence].push(taxon);
          }
          sid += 1;

	      }
	      else
	      {
          MSA["type"] = 'with_id';
          
	        if(taxalignments[0] == '0')
	        {
	          MSA['ans'][taxalignments[1].replace(/\./g,'')] = taxalignments.slice(2,taxalignments.length);
	        }
	        else
	        {
            var taxon = taxalignments[1].replace(/\./g,'')+'_'+taxalignments[0];
            
            /* modify taxon length */
            if(taxalignments[1].length > MSA['taxlen']){MSA['taxlen'] = taxalignments[1].length;}

            var alignment = taxalignments.slice(2,taxalignments.length);
            var sequence = alignment.join('').replace(/-/g,'');
            sid = taxalignments[0];

            MSA['taxa'][taxon] = alignment;

            var idx = uniques.indexOf(sequence);
            if(idx == -1)
            {
              var tmp_taxa = [taxon];
              sequences[sequence] = tmp_taxa;
              uniques.push(sequence);
              unique_taxa.push(taxon);
            }
            else
            {
              sequences[sequence].push(taxon);
            }

            if(alignment.length > MSA['width']){MSA['width'] = alignment.length;}
            
	        }
	      }
      }
    }
  }

  /* append uniques to MSA to make it global */
  MSA['uniques'] = unique_taxa;
  MSA['sequences'] = sequences;
  msa_status['parsed'] = true;
}

function showMSA(unique)
{
  /* parse MSA files */
  if(msa_status['parsed'] == false) 
  {
    parseMSA();
  }

  var msa = document.getElementById('msa');
  msa.innerHTML = '';
  
  var text = '<table id="msa_table">';
  if ("dataset" in MSA)
  {
    text += '<tbody id="msa_head"><tr class="header"><th id="dataset" class="header" colspan="'+(MSA['width']+1)+'">DATASET: '+MSA['dataset']+"</th></tr>";
  }
  if ("alignment" in MSA)
  {
    text += '<tr class="header"><th id="alignment" class="header" colspan="'+(MSA['width']+1)+'">ALIGNMENT: '+MSA['alignment']+'</th></tr></tbody>';
  }
  //text += '<table id="msa">';
  
  if(unique)
  {
    var taxa = MSA['uniques'];
    msa_status['mode'] = 'edit';
    document.getElementById('refresh').className = "submit active";
  }
  else
  {
    var taxa = [];
    for (key in MSA['taxa']){taxa.push(key)}
    msa_status['mode'] = 'show';
    //var refresh = document.getElementById('refresh').className = "submit inactive";
  }
  
  /* no clics for show-mode */
  /* current solution is not nice in terms of modularity, it should be modified later on! */
  if(unique)
  {
    /* append tbodies */
    text += '<tbody id="msa_body">';
    
    var idx = 1;

    for (var i in taxa.sort())
    {
      var taxon = taxa[i].replace(/_[0-9]+$/,'');

      text += '<tr id="'+taxa[i]+'" class="alm_row"><th class="taxon">'+taxon+'</th>';
      var k = 1;
      var gap = 0;
      for (var j in MSA['taxa'][taxa[i]])
      {
        var phon = MSA['taxa'][taxa[i]][j];

        /* now try to find the column */
        var dolgo = "dolgo_ERROR";
        if (phon in DOLGO){dolgo = "dolgo_"+DOLGO[phon]}
        else if (phon.slice(0,2) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(0,2)];}
        else if (phon.slice(0,1) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(0,1)];}
        else if (phon.slice(1,3) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(1,3)];}
        else if (phon.slice(1,2) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(1,2)];}
        else if (phon == "-"){dolgo = "dolgo_GAP";}
        
        if(phon != '-')
        {            
	        text += '<td title="insert gap" id="'+taxa[i]+'_'+k+'" onclick="addGap('+"'"+taxa[i]+'_'+k+"'"+')" class="residue '+dolgo+'">'+phon+'</td>';
	        k += 1;
	        gap = 0;
              }
              else
              {
	        gap += 1;
	        text += '<td title="delete gap" id="'+taxa[i]+'_'+k+'_gap" onclick="deleteGap('+"'"+taxa[i]+'_'+k+'_gap'+"'"+')" class="residue '+dolgo+'">'+phon+'</td>';
        }
      }
      text += '<td id="'+taxa[i]+'_last'+'" class="new_gap" title="insert gap" onclick="addGap('+"'"+taxa[i]+'_last'+"'"+')"></tr>';
    }
    text += '</tbody>';
  }
  else
  {
    /* append tbodies */
    text += '<tbody id="msa_body">';

    for (var i in taxa.sort())
    {
      var taxon = taxa[i].replace(/_[0-9]+$/,'');

      text += '<tr id="'+taxa[i]+'" class="alm_row"><th class="taxon">'+taxon+'</th>';
      var k = 1;
      var gap = 0;
      for (var j in MSA['taxa'][taxa[i]])
      {
        var phon = MSA['taxa'][taxa[i]][j];

        /* now try to find the column */
        var dolgo = "dolgo_ERROR";
        if (phon in DOLGO){dolgo = "dolgo_"+DOLGO[phon]}
        else if (phon.slice(0,2) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(0,2)];}
        else if (phon.slice(0,1) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(0,1)];}
        else if (phon.slice(1,3) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(1,3)];}
        else if (phon.slice(1,2) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(1,2)];}
        else if (phon == "-"){dolgo = "dolgo_GAP";}
        
        if(phon != '-')
        {
	        text += '<td id="'+taxa[i]+'_'+k+'" class="residue_show '+dolgo+'">'+phon+'</td>';
	        k += 1;
	        gap = 0;
              }
              else
              {
	        gap += 1;
	        text += '<td id="'+taxa[i]+'_'+k+'_gap"  class="residue_show '+dolgo+'">'+phon+'</td>';
        }
      }
      text += '</tr>';
    }
    text += '</tbody>';
  }

  //if(MSA['ans'].length >= 1){
  text += '<tbody id="msa_annotation"><tr><td colspan="'+(MSA['width']+1)+'"></td></tr>'; //}
  
  for (annotation in MSA['ans'])
  {
    text += '<tr class="annotation_row">';
    text += '<td class="annotation_type">'+annotation+'</td>';
    
    var ans = MSA['ans'][annotation];
    for (var j in ans)
    {
      if(ans[j] != '.')
      {
	text += '<td class="annotation">'+MSA['ans'][annotation][j]+'</td>';
      }
      else
      {
	text += '<td class="annotation"></td>';
      }
    }
    text += '</tr>';
  }
  //if(MSA['ans'].length >= 1){
  text += '</tbody>'; //}

  text += '</table>';

  msa.innerHTML = text;

  if(msa_status['mode'] == 'edit')
  {
    document.getElementById('msa_body').rows[0].childNodes[0].className += ' active';
var active;
$(document).keydown(function(e){
    active = $('td.active').removeClass('active');
    var x = active.index();
    var y = active.closest('tr').index();
    if (e.keyCode == 37) { 
       x--;
    }
    if (e.keyCode == 38) {
        y--;
    }
    if (e.keyCode == 39) { 
        x++
    }
    if (e.keyCode == 40) {
        y++
    }
    active = $('tr').eq(y).find('td').eq(x).addClass('active');
});}
}


function plotWord(word)
{
	var phones = word.split(' ');
	var text = '';
	for(var i=0;i<phones.length;i++)// in phones)
	{
		var phon = phones[i];

    /* now try to find the column */
    var dolgo = "dolgo_ERROR";
    
		if (phon in DOLGO){dolgo = "dolgo_"+DOLGO[phon]}
    else if (phon.slice(0,2) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(0,2)];}
    else if (phon.slice(0,1) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(0,1)];}
    else if (phon.slice(1,3) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(1,3)];}
    else if (phon.slice(1,2) in DOLGO){dolgo = "dolgo_"+DOLGO[phon.slice(1,2)];}
    else if (phon == "-"){dolgo = "dolgo_GAP";}
    
    if(phon != '-')
    {            
	    text += '<span class="residue '+dolgo+'">'+phon+'</span>';
    }
		else
    {
	    text += '<span class="residue '+dolgo+'">'+phon+'</span>';
    }
  }

	return text;
}

function highLight()
{
	var db = document.getElementById('db');
	var tokens = document.getElementsByClassName('Tokens');
	for(var i=0;i<tokens.length;i++)
	{
		//if(tokens[i].innerHTML == tokens[i].dataset.value)
		//{
			var word = plotWord(tokens[i].innerHTML);
			//tokens[i].innerText = tokens[i].dataset.value;
			tokens[i].innerHTML = word;
		//}
	}
}
