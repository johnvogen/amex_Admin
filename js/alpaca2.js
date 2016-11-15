
var platform;
var repository;
var branch;
var node;
var repositoryId = 'f2c3571d7a2955e7f8a1';
var branchId = '7935c19b649b9c399528';
//var nodeId = '5b5019bc3683e8438699'; //counter node
var schemaSource;
var optionsSource;
var dataSource;
//var pageIdToLoad = "21f5c2a082ab59f6391b";
var pageIdToLoad;
var username;
var password;






//Switching from local developement to production will require switching config objects

function getPage(callback) {

    //            var config = {
    //            "username": username,
    //            "password": password,
    //            "baseURL": "/proxy"
    //                    }

    var config = {
        "clientKey": "1bd1ddc4-37c7-4c80-b69b-b0d8d226cc34",
        "clientSecret": "CamxJ6k/aNYbuZVV1uTox0imFpsURRugGjt/AD77DGENmJ+U87Z1eh4KBdKtCcY8/Regd9DH8DYWGJ2mcdSCsK3a+aX1WR2ftnxQQ8yg6ck=",
        "username": username,
        "password": password,
        "baseURL": "https://api.cloudcms.com",
        "application": "c8a4dc1dd5644f2934be"
    }

    Gitana.connect(config, function (err) {
        if (err) {
            console.log("Error: " + err + window.location.href);
            //$("#loading-image").css('display', 'none');

            $("#lblLoginLable").html("Username or password are incorrect. Please try again.");
            $("#dialog").css('display', 'block');
            $("#dialog").dialog("open");

            return;

        } 
    }).then(function () {
        platform = this;

        document.cookie = "username=" + username;
        document.cookie = "password=" + password;
      
        this.readRepository(repositoryId).then(function () {
            repository = this;


            this.readBranch(branchId).then(function () {
                branch = this;
            

                /*
                        node = this.readNode(pageIdToLoad).then(function () {
                            callback && callback();
  
                        });
                    
                    */

            });
        });
    });
}

var myData = { 

    "d9275c2e2cac27215841": "American Express",
    "35fdcd1a842f9bd38093": "Be Healthier",
    "24faf2f946aaaf4df61c": "Care for Family",
    "e598bce4cbbc130ca67c": "Chat Money Expert",
    "2f459081ab8e3cbe5e44": "Contact Us",
    "baee9580b9b08558d6a1": "Core Benefits",
    "5e9bfb25da6e1274d3bf": "Education Benefits",
    "27936ab42ee296645389": "Family Expense",
    "4504e3b77aa2bbd9592f": "Get Help Health Care",
    "8399f467a5165c36718f": "Get Ready To Enroll",
    "c4428f3933404834e0db": "Get Specialized Health",
    "fc3b2067976ea86d472f": "Lower Expenses",
    "1ff9c71fef8aadd38466": "Pregnancy Adoption Benefits",
    "cd9b943b651016db032e": "Protect family Financially",
    "9706e1042e10ba5483df": "Save For The Future",
    "341faff00653a2a45b04": "See Doctor",
    "8fc2f47c2238f5614da0": "Special Support For Family",
    "fdc79e68d1f59a1c5c35": "Spend money",
    "bd12b9dd3b85c86c169b": "Get_Help_Health_Care2"

}

$("#myDropdown").alpaca({
    "options": {
        "label": "What page would you like to edit?",
        "type": "select",
        //"dataSource": { "5c5fb3b173fbb1185b4d": "medical.html" }
        "dataSource": myData
    }
});

$("#myDropdown").change(loadPage);

function loadPage() {

    pageIdToLoad = $("#alpaca1").val() || "21f5c2a082ab59f6391b";

    reShowForm();
    
}




var timer;

function setTimer() {
    timer = setTimeout(function () {
        location.reload();
    }, 900000);
}

function clearTimer() {
    clearTimeout(timer);
}


function reShowForm() {

    clearTimer();
    console.log("Timer Cleared");
    setTimer();
    console.log("Timer Set");
    platform = Gitana.connect({
        "clientKey": "106d6b42-46e7-4f54-9a52-7ceed8e682b4",
        "clientSecret": "It+QMtokAs7f8k5LB3hzgnNGnrR6n99/q3PpxkszdFNIVoU+BD6C7Y68s6S6fNiY2xgkSbBQlCpDJp98AWWPCap2MaNR+F6nk1H44gFAKCA=",
        "username":username,
        "password":password,
        "baseURL": "https://api.cloudcms.com",
        "application": "aab44469e1c69b575aad"

    }).then(function () {
        platform = this;

        repository = platform.readRepository("f2c3571d7a2955e7f8a1").then(function () {

            branch = repository.readBranch("7935c19b649b9c399528").then(function () {

                node = branch.readNode(pageIdToLoad).then(function () { 
                    //showAmexForm();
                    showDrop();
                });
            });
        });
    });

           /* node = branch.readNode(pageIdToLoad).then(function () { 
                showAmexForm();
       
            });*/


}
function showDrop(){

    //console.log(node.topics);
   
    $("#myform").html("");

    var topicArray = new Array();
    for (var i = 0; i < node.topics.length; i++) {
         topicArray[i] = node.topics[i].topicHeader;

    }
    
    showForm(topicArray);

   /* var s = "<select name='topicSelect' onchange='showForm(this)'>";
    console.log(s);
    for (var i = 0; i < node.topics.length; i++) {
        console.log(node.topics[i]);

        s += ("<option value='" + node.topics[i].topicHeader + "' >" + node.topics[i].topicHeader + "</option>");

    }
    $("#myTopic").append(s);
    */
    
  
}
function showForm(str) {

    //scroll to topic & update

   // console.log(str.value);
    $('#myform').append('<div><strong>Select Topic :</strong></div>');
    $("#myform").alpaca({
        "schema": {
            "type": "string",
            "enum": str
        },
        "options": {
            "type": "select",
            "onFieldChange": function (e) {

                var ind = str.indexOf(this.getValue());

              //  f(this.getValue());             
        

                var title= 'topics_' + ind +"_topicHeader"; 
                $links = $("div[data-alpaca-field-name*='" + title + "']");
 
                $('html, body').animate({
                    scrollTop: $links.offset().top
                }, 'slow');
               
                 
            }
        }
    });

    
    var f = function (viewId) {
       
    
        $("#field1").empty();

        $("#field1").alpaca({
            "view": "bootstrap-edit",
            "data":node,
            "schema": {
                "title": "American Express",
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Page Name",
                        readonly: true
                    },
                    "heading": {
                        "type": "string",
                        "title": "Heading",
                        readonly: true
                    },
                    "title": {
                        "type": "string",
                        "title": "Page Title",
                        readonly: true
                    },
                    "prefix": {
                        "type": "string",
                        "title": "prefix",
                        readonly: true
                    },
                    "flag": {
                        "type": "string",
                        "title": "flag",
                        readonly: true
                    },
                    "body": {
                        "type": "string",
                        "title": "body",
                        readonly: true
                    },
                    "topics": {
                        "type": "array",
                        "title": "Topics",
                        "items": {
                            "properties": {
                                "topicHeader": {
                                    "type": "string",
                                    "title": "Topic Header",
                                    readonly: true
                                },
                                "topicTitle1": {
                                    "type": "string",
                                    "title": "TopicTitle"
                                },
                                "items": {
                                    "type": "array",
                                    "title": "Callout Items",
                                    "items": {
                                        "type": "object",
                                        "title": "Item",
                                        "properties": {
                                            "link": {
                                                "type": "string",
                                                "title": "Link Url"
                                            },
                                            "sblob": {
                                                "type": "string",
                                                "title": "Description"
                                            }
                                        }
                                    }
                                },
                                "rich_blobs": {
                                    "items": {
                                        "type": "string",
                                        "title": "Items"
                                    },
                                    "type": "array",
                                    "title": "Editable Callouts"
                                }
                            },
                            "type": "object"
                        }
                    }
                },              
                    "_parent": "n:node",
                    "description": "custom:testame0",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "items": {}                
            },
            "options": {
                "form": {
                    "buttons": {
                        "submit": {
                            "click": function () {
                                clearTimer();
                                console.log("Timer Cleared");
                                setTimer();
                                console.log("Timer Set");

                                var value = this.getValue();
                                alert(JSON.stringify(value, null, "  "));


                                
                                node.name = value.name;
                                node.heading = value.heading;
                                node.title = value.title;
                                node.prefix = value.prefix;
                                node.flag = value.flag;
                                node.body = value.body;
                                node.topics = value.topics;

                                node.update().then(function () {
                                    alert("Form Submitted")
                                });
                            }
                        }
                    }
                },
                "title": "newPageTitle",
                "engineId": "alpaca1",
                "fields": {                    
                    "topics": {
                        "type": "array",
                        "toolbarSticky": false,
                        "items": {
                            "fields": {
                                "topicTitle1": {
                                    "type": "text",
                                    "onFieldChange": function (e) {                                      
                                        var value = this.getValue();                                         
                                    }
                                },
                                "items": {
                                    "actionbar": {
                                        "actions": [{
                                            "action": "add",
                                            "enabled": false
                                        }]
                                    }
                                },
                                "rich_blobs": {
                                    "items": {
                                        "type": "ckeditor",
                                        "ckeditor": {
                                            "toolbar": [
                                                ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList'], ['Table', 'Source']
                                            ]
                                        }
                                    },
                                    "actionbar": {
                                        "actions": [{
                                            "action": "add",
                                            "enabled": false
                                        }]
                                    }
                                }
                            
                            }
                        }
                    }
                }
            } 
        });
    };
    f("bootstrap-edit");

    
    /*
    
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "properties": {
                "topics": {
                    "type": "array",
                    "title": "Topics",
                    "items": {
                        "properties": {
                            "topicHeader": {
                                "type": "string",
                                "title": "Topic Header",
                                readonly: true
                            },
                            "topicTitle1": {
                                "type": "string",
                                "title": "TopicTitle"
                            },
                            "items": {
                                "type": "array",
                                "title": "Callout Items",
                                "items": {
                                    "type": "object",
                                    "title": "Item",
                                    "properties": {
                                        "link": {
                                            "type": "string",
                                            "title": "Link Url"
                                        },
                                        "sblob": {
                                            "type": "string",
                                            "title": "Description"
                                        }
                                    }
                                }
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "string",
                                    "title": "Items"
                                },
                                "type": "array",
                                "title": "Editable Callouts"
                            }
                        },
                        "type": "object",
                        "dependencies": {
                            "topicTitle1":"topicHeader"
                        }
                    }
                }
            }
        },
        "option":
            {
                "topics": {
                    "type": "array",
                    "toolbarSticky": false,
                    "items": {
                        "fields": {
                            "topicTitle1": {
                                "type": "text"
                            },
                            "items": {
                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    }]
                                }
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "ckeditor",
                                    "ckeditor": {
                                        "toolbar": [
                                            ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList'], ['Table', 'Source']
                                        ]
                                    }
                                },
                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    }]
                                }
                            }
                        }
                    }
                }
        }
    });
  
  */
}


//original default edit & submit
function showAmexForm() {

    console.log("show amex form");

    
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "American Express",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "Page Name",
                    readonly: true
                },
                "heading": {
                    "type": "string",
                    "title": "Heading",
                    readonly: true
                },
                "title": {
                    "type": "string",
                    "title": "Page Title",
                    readonly: true
                },
                "prefix": {
                    "type": "string",
                    "title": "prefix",
                    readonly: true
                },
                "flag": {
                    "type": "string",
                    "title": "flag",
                    readonly : true
                },
                "body": {
                    "type": "string",
                    "title": "body",
                    readonly: true
                },
                "topics": {
                    "type": "array",
                    "title": "Topics",
                    "items": {
                        "properties": {
                            "topicHeader": {
                                "type": "string",
                                "title": "Topic Header",
                                readonly: true
                            },
                            "topicTitle1": {
                                "type": "string",
                                "title": "TopicTitle"
                            },
                            "items": {
                                "type": "array",
                                "title": "Callout Items",
                                "items": {
                                    "type": "object",
                                    "title": "Item",
                                    "properties": {
                                        "link": {
                                            "type": "string",
                                            "title": "Link Url"
                                        },
                                        "sblob": {
                                            "type": "string",
                                            "title": "Description"
                                        }
                                    }
                                }
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "string",
                                    "title": "Items"
                                },
                                "type": "array",
                                "title": "Editable Callouts"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "description": "custom:testame0",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function () {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                            alert(JSON.stringify(value, null, "  "));


                            //preview design feather light 
                            //  $('#featherlight_data').modal('show');
                            for (var i = 0; i < value.topics.length; i++) {
                                $('#tbl_preview').append("<tr id='tbl_preview_tr"+ i +"'><td>" + value.topics[i].topicHeader + "</td><td>" + value.topics[i].topicTitle1 + "</td>");
                                for (var j = 0; j < value.topics[i].items.length ; j++) {

                                    $('#tbl_preview_tr' + i).append("<tr id='tbl_preview_tr_inner" + j + "'><td>" + value.topics[i].items[j].sblob + "</td><td>" + value.topics[i].items[j].link  + "</td> </tr>");
                                    //$('#tbl_preview_tr' + i).append("<td>" + value.topics[i].items[j].link + "</td><td></td>");
                                }
                                $('#tbl_preview_tr' + i).append("<td id='tbl_preview_tr_editable"+ i +"'></td>");

                                for (var k = 0; k < value.topics[i].rich_blobs.length ; k++) {
                                    //  console.log(k + "===" + value.topics[i].rich_blobs[k]);
                                    $('#tbl_preview_tr_editable' + i).append("<tr id='tbl_preview_tr_editable_inner" + k + "'><td>" + value.topics[i].rich_blobs[k] + "</td></tr>");


                                    // $('#tbl_preview_tr' + i).append("<tr id='tbl_preview_tr_editable" + j + "'><td>"  + value.topics[i].rich_blobs[k] + "</td></tr>");
                                }
                            }


                            /* modal view
                            $('.lbcontent').append(
                                "<div><h3>" + value.title + "</h3><h4>Topics</h4></div>");


                            for (var x = 0 ; x < value.topics.length ; x++) {

                                $('.lbcontent').append("<div><h4>TopicHeader" + x +"</h4>" + value.topics[x].topicHeader + "</div>");
                                $('.lbcontent').append("<div><h4>TopicTitle</h4>" + value.topics[x].topicTitle1+"</div>");
                                
                                for (var i = 0; i < value.topics[x].items.length ; i++) {
                                    $('.lbcontent').append("<div><span>Item" + i + ":  " + value.topics[x].items[i].sblob + "</span></div>");
                                    $('.lbcontent').append("<div><span>Link" + i + ":" + value.topics[x].items[i].link + "</span></div>");
                                }
                             
                                 
                                for (var j = 0; j < value.topics[x].rich_blobs.length ; j++) {
                                    $('.lbcontent').append("<div><span>Editable callout" + i + ":" + value.topics[x].rich_blobs[j] + "</span></div>");
                                } 
                            }*/
                            //alert(JSON.stringify(node));
                           
    
                            node.name = value.name;
                            node.heading = value.heading;
                            node.title = value.title;
                            node.prefix = value.prefix;
                            node.flag = value.flag;
                            node.body = value.body;
                            node.topics = value.topics;

                            node.update().then(function () {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "heading": {
                    "type": "text"
                },
                "title": {
                    "type": "text"
                },
                "prefix": {
                    "type": "text"
                },
                "flag": {
                    "type": "text"
                },
                "body": {
                    "type": "text"
                },
                "topics": {
                    "type": "array",
                    "toolbarSticky": false,
                    "items": {
                        "fields": {
                            "topicTitle1": {
                                "type": "text"
                            },
                            "items": {
                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    }]
                                }
                            },
                            "rich_blobs": {
                                "items": {
                                    "type": "ckeditor",
                                    "ckeditor": {
                                        "toolbar": [
                                            ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList'], ['Table', 'Source']
                                        ]
                                    }
                                },
                                "actionbar": {
                                    "actions": [{
                                        "action": "add",
                                        "enabled": false
                                    }]
                                }
                            }
                        }
                    }
                }
            }
        },
        "postRender": function (control) {

            //style topics 
            var n = control.childrenByPropertyId["topics"].children;
            
            for (var i = 0; i < n.length ; i++) {
                n[i].children[0].getFieldEl().addClass('orangeBackground');
                n[i].children[1].getFieldEl().addClass('orangeBackground');                
                n[i].children[3].getFieldEl().addClass('orangeBackground1');
                n[i].children[2].getFieldEl().addClass('orangeBackground1');

                

                console.log(n[i].children[3].childrenByPropertyId['rich_blobs']);
                console.log(n[i]);

                for (var j = 0; j < n[i].children[3].length; j++) {                
                    n[i].children[3].children[j].getFieldEl().css("background-color", "lightgreen");
                }

                
            }
     
            //control.childrenByPropertyId["topics"].getFieldEl().addClass('orangeBackground');
        }
    });

  
    
}
 



    $('.featherlight-close').on('click', function () {
        $('.featherlight-close').click();
    });


    function checkCookie() {

        if (performance.navigation.type == 1) {
            console.log('page reloaded');
            Gitana.deleteCookie("password", "/ah-prod.com-amex-admin");
            Gitana.deleteCookie("username", "/ah-prod.com-amex-admin");
            Gitana.deleteCookie("password", "/localhost");
            Gitana.deleteCookie("username", "/localhost");
            Gitana.deleteCookie("password", "/");
            Gitana.deleteCookie("username", "/");

        }

        console.log('checking cookies');
        var user = getCookie("username");
        var pswd = getCookie("password");
        if (user != "" && pswd != "") {
            console.log("Welcome again " + user);
            username = user;
            password = pswd;
        
            $("#dialog").dialog("close");
            
            loadPage();
        } else {
            //   $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><br/><input id="submitButton" onclick="setCredentialsFromLogin()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');

            /*$("#dialog").dialog({
                modal: true,
                draggable: false,
                width: "auto",
                position: {
                    my: "top",
                    at: "center",
                    of: window
                },
                create: function (event, ui) {
                    $(this).css("maxWidth", "300px");
                }
    
            });
            $("#dialog").css('display', 'block');
    
            $(".selector").dialog("open");*/
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function setCredentialsFromLogin() {
 
        username = $("#txtUsername").val();
        password = $("#txtPassword").val();
        $("#dialog").css('display', 'none');
        $("#home").css('visibility', 'visible');
        $("#edit_nav").css('visibility','visible');
      
        checkCookie();
        //getPage(showAmexForm);

        getPage(showDrop);


    }



    function logout() {
        Gitana.deleteCookie("password", "/ah-prod.com-amex-admin");
        Gitana.deleteCookie("username", "/ah-prod.com-amex-admin");
        Gitana.deleteCookie("password", "/localhost");
        Gitana.deleteCookie("username", "/localhost");
        Gitana.deleteCookie("password", "/");
        Gitana.deleteCookie("username", "/");

        platform.logout();
        open("alpaca2.html", "_self");
    }

    
    
    
    var fl = document.getElementById('myFileUpload5');
    
    fl.onchange = function (e) {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'pdf':
                console.log('pdf file type allowed');
                break;
            case 'xls':
                console.log('xls file type allowed');
                break;
            case 'xlsx':
                console.log('xlsx file type allowed');
                break;
            case 'docx':
                console.log('docx file type allowed');
                break;
            default:
                alert('Pdf , doc or xls/xlsx files may be uploaded');
                this.value = '';
        }
    };
    
    
    $("#uploadFilenameEdit5").on('change keyup paste mouseup', function () {
        $("#myFileName").html($("#uploadFilenameEdit5").val());
    });
      


    //This is form upload scripting here--------------------------------------------
    var pdfContainerId = 'c405f23f5687d5167cd1';

    function submitForm() {
        var formData = new FormData($("#frmeditSubmitForm5")[0]);

        

        platform = Gitana.connect({
            "clientKey": "106d6b42-46e7-4f54-9a52-7ceed8e682b4",
            "clientSecret": "It+QMtokAs7f8k5LB3hzgnNGnrR6n99/q3PpxkszdFNIVoU+BD6C7Y68s6S6fNiY2xgkSbBQlCpDJp98AWWPCap2MaNR+F6nk1H44gFAKCA=",
            "username": username,
            "password": password,
            "baseURL": "https://api.cloudcms.com",
            "application": "aab44469e1c69b575aad"

        });

        console.log(platform);
        var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
        var form = $("#frmeditSubmitForm5");

        $.ajax({
            type: "POST",
            url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + pdfContainerId + "/attachments/" + ($("#uploadFilenameEdit5").val()).replace(" ", "_") + "/",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                authorization: authorizationHeader
            }
        });
    }

    //This ends form upload scripting-----------------------------------------------
