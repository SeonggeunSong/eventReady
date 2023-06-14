import React from 'react';

const login_id = 'rpa.tvlab';
const login_pw = 'product1!';
const auth = btoa(login_id + ':' + login_pw);
//? 확실치 않음
const oauth_token = "AAECAzY0ODdBMzgzNjQ4ODMwMjNDTj1SUEFUVkxBQi9PVT1YMjAyMjM2Mi9PVT1Db250ci9PVT1MR0UvTz1MRyBHcm91cHrM2iNiG1gN7orEWLoEUBTvJSXn";


export function jiraHistory(){
    // CI팀에서는 저렇게 프록시서버 만들어서 로그인절차없이 지라 정보 읽어
    let url = "http://10.164.2.79:4000/jira/devtracker/search?jql=";
    let init_restapi_url = "http://hlm.lge.com/issue/rest/api/2/search";
    let jql = 'project = TVEVENT and issuetype  = Task ';    
    url = url+jql;
    
    let param = {"jql":jql, "maxResults":"1000", "startAt":"0", "fields":[
            "key", "status", "priority", "duedate", "created", "updated","resolutiondate", "summary", "assignee", "updated", "reporter","resolution", "issuetype"]};

    let xhttp = CreateHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
            let resultJSON = JSON.parse(xhttp.responseText);
            let resultIssues = resultJSON.issues;
            let fields = resultJSON.fields;
            let total = resultJSON.total;

            console.log('=== 성공이염!!' + total);
            
        }
        else {
            alert('jiraHistory() 에서 에러');
        }
    }
    };
    xhttp.open("POST", init_restapi_url, true);	// 동기 false, 비동기 true
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Authorization", "Basic " + auth ,"Access-Control-Allow-Origin: *"); 
    xhttp.setRequestHeader("Content-Type", "application/json;"); 
    xhttp.send(JSON.stringify(param));    
    //xhttp.send('{"userName":'+login_id+',"password":'+login_id+'"}',JSON.stringify(param));    
}

/*
function get_restapi_user_id(input_username, clicked_input_obj){
    let jql = '?username='+input_username;
    console.log(jql);
    
    //let param = {"jql": jql , "maxResults":"100", "startAt":"0", "fields":['name','displayName']};
    let url = JIRA_RESTAPI_search_user+jql;
    var rst = '-1';

    var xhttp = CreateHttpRequest();
    xhttp.open('GET',url,false);
    xhttp.withCredentials = true;
    //xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8", "Access-Control-Allow-Origin: *");
    xhttp.setRequestHeader("Accept", "application/json; charset=utf-8");
    xhttp.send();

    if (xhttp.readyState == 4){
        if( xhttp.status == 200) {
            console.log(xhttp.responseText);
            if (xhttp.responseText =="")
            {
                rst = "";
                //console.log('xhttp.responseText ==""');
            }else{

                rst = JSON.parse(xhttp.responseText);
                //console.log('JSON.parse(xhttp.responseText);');
            }
            
        }  
        else {
            rst = { 
                    "key" : "error" , 
                    "msg" :  xhttp.responseText , 
                    "status" :  xhttp.status ,
                    "arg" :  jql
                }; 
        }
    }

    if(rst["key"] == "error")
    {
        console.log("에러상황>> " + rst["msg"]);
        alert('Jira Subtask 생성 Error! 관리자에게 문의하세요\r\n Error Code : ' + rst["status"]);            
    }
    else
    {
        //alert('확인완료!');
        console.log('확인 완료!');
        console.log(rst);
        input_user_id(rst, clicked_input_obj);
    }

}
*/
function CreateHttpRequest(){
	var xhttp;
	if (window.XMLHttpRequest)	{
		xhttp=new XMLHttpRequest();
	} else {
		alert("not XMLHttpRequest");
	}
	return xhttp;
}