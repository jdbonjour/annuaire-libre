// utilities.js  -     ENAC-IT / J.-D. Bonjour


function msgto ( mailID, mailDomain, mailSubject, linkText ) {
  // EPFL-ENAC-IT / JDB / 2007
  //     rev. 19.7.2012 : ajout du champ linkText
  // 
  // Fonction d'encodage par JavaScript des adresses Email (mesure anti-spam) avec :
  //     <script>msgto('jules.dupond', 'epfl.ch' ,'sujet...', 'texte affiché...')</script>
  // 
  // Les 2 premiers paramètres sont obligatoires. Les 3e et 4e sont facultatifs, mais
  // si l'on veut utiliser le 4e il faut fournir le 3e.
  
  if ( typeof mailSubject == "undefined" ) {
    paramSubject = "" ;
  } else {
    paramSubject = "?Subject=" + mailSubject ;
  }
  
  if ( typeof linkText == "undefined" ) {
    displayedText = mailID + "@" + mailDomain ;
  } else {
    displayedText = linkText ;
  }
  
  mytxt = "<a href=\"mailto:" + mailID + "@" + mailDomain + paramSubject + "\">" + displayedText + "</a>" ;
  document.write (mytxt);
}



function showhide(id) {
  // EPFL-ENAC-IT / JDB / 12.5.2010
  // Afficher/masquer le contenu d'une division via un lien avec :
  //   <a href="javascript:showhide('div1'); ">Afficher/Masquer</a>
  //      ou avec <a href="#" onClick="showhide('div1'); ">Afficher/Masquer</a>
  //      mais cette 2e techique repositionne browser au haut de la page
  //   <div id="div1" style="display: none;"> contenu de la division ... </div>
  
  if (document.getElementById) {
    var obj = document.getElementById(id);
    if (obj.style.display == "none") {
      obj.style.display = "block";
    } else {
      obj.style.display = "none";
    }
  }
}



function showhide_button(id,bouton) {
  // EPFL-ENAC-IT / JDB / 12.5.2010
  // Afficher/masquer le contenu d'une division via un bouton avec :
  //   <input type="button" onClick="javascript:showhide_button('div2',this);" value="Afficher">
  //   <div id="div2" style="display: none;"> contenu de la division ... </div>
  
  if (document.getElementById) {
    var obj = document.getElementById(id);
    if (obj.style.display == "none") {
      obj.style.display = "block";
      bouton.value = "Masquer";
      bouton.className = "bouton_masquer";
    } else {
      obj.style.display = "none";
      bouton.value = "Afficher";
      bouton.className = "bouton";
    }
  }
}



function os_type() {
  // EPFL-ENAC-IT / JDB / 26.5.2015
  // Récupérer le type d'OS du client
    // Remarque: sous Ubuntu (14.04) Firefox 38 répond "Unix", et Google Chrome 43 répond "Linux"
    var OSName = "unknown";
    if (navigator.appVersion.indexOf("Win")!=-1)   OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1)   OSName="MacOSX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
    if (navigator.appVersion.indexOf("X11")!=-1)   OSName="Unix";
    return OSName;
}



function data_to_table (dataID, tableID, col_separator, width, table_classes, th_c1, th_c2, td_c1, td_c2, link) {
    // EPFL-ENAC-IT / JDB / 17.5.2017
    // Converti les données de l'élément dataID, délimitées en colonnes
    // par le caractère col_separator et en lignes par <newline>, en un
    // tableau tableID <table class="table_classes" width="width">...</table> .
    // Les <espaces> débutant et terminant le contenu des cellules sont supprimés (trim).
    // Si dans une cellule le contenu débute par :
    //    "*"   => <th class="th_c1">contenu</th>
    //    "#"   => <th class="th_c2">contenu</th>
    //    "+"   => <td class="td_c2">contenu</td>
    //    sinon => <td class="td_c1">contenu</td>
    // et "/"   => <td class="td_c1"><a href=lien>contenu</a></td>
    //    où lien est fabriqué en substituant dans 'link' la chaîne '###' par 'contenu'
    
    var table = '';
    var rows = new Array();

    rows = document.getElementById(dataID).innerHTML.split('\n');
    table += '<table class="' + table_classes + '" width="' + width + '">' ;

    for(var line = 0; line < rows.length; line++) {
        if (rows[line].trim().length > 0) {
            var columns = rows[line].split(col_separator);
            table += '<tr>';

            for(var column = 0; column < columns.length; column++) {
                var cell = columns[column].trim() ;
                switch (cell.substring(0,1)) {
                    case "*":
                        table += '<th class="' + th_c1 + '">' + cell.substring(1) + '</th>';
                        break;
                    case "#":
                        table += '<th class="' + th_c2 + '">' + cell.substring(1) + '</th>';
                        break;
                    case "+":
                        table += '<td class="' + td_c2 + '">' + cell.substring(1) + '</td>';
                        break;
                    case "/":
                        contenu = cell.substring(1).trim() ;
                        lien = link.replace("###", contenu) ;
                        table += '<td class="' + td_c2 + '">' + '<a href="' + lien + '">' + contenu + '</a></td>';
                        break;
                    default:
                        table += '<td class="' + td_c1 + '">' + cell + '</td>';
                }
            }

            table += '</tr>';
        }
    }

    table += '</table>';
    document.getElementById(tableID).innerHTML = table;
}


