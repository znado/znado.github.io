!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){class r extends React.Component{constructor(e){super(e),this.state={optionType:"call"},this.handleOptionTypeToggle=this.handleOptionTypeToggle.bind(this),this.formattedHeaders={expiration_date:"Expires",strike_price:"Strike",type:"Type",option_price:"Price"}}handleOptionTypeToggle(){this.setState(e=>({optionType:"call"==e.optionType?"put":"call"}))}getKeys(){return["expiration_date","strike_price","type","option_price"]}renderHeader(){return this.getKeys().map((e,t)=>React.createElement("th",{key:e},this.formattedHeaders[e]))}renderRows(){let e=this.props.rows,t={};e.sort((e,t)=>e.expiration_date<t.expiration_date?-1:e.expiration_date==t.expiration_date?t.strike_price-e.strike_price:1);let r=this.getKeys(),o=[];for(let i in e){let a=Object.assign({},e[i]);if(a.type==this.state.optionType){if(a.expiration_date in t)a.expiration_date="";else{t[a.expiration_date]=!0;let e=a.expiration_date.split("-");a.expiration_date=e[1]+"/"+e[2]}o.push(React.createElement("tr",{key:i},React.createElement(n,{key:i,data:a,keys:r})))}}return o}render(){return 0==this.props.rows.length?React.createElement("div",null):React.createElement("div",null,React.createElement("hr",null),React.createElement("div",{class:"stock-header"},React.createElement("h2",null,React.createElement("a",{target:"_blank",href:"https://www.google.com/search?q=%24"+this.props.symbol},this.props.symbol)," $"+this.props.rows[0].stock_price.toFixed(2)),React.createElement("button",{class:"type-toggle",onClick:this.handleOptionTypeToggle},"Toggle")),React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,this.renderHeader())),React.createElement("tbody",null,this.renderRows())))}}const n=e=>e.keys.map((t,r)=>{let n=e.data[t];return"option_price"!=t&&"strike_price"!=t||(n=n.toFixed(2),n="$"+n),React.createElement("td",{key:t},n)});class o extends React.Component{render(){return React.createElement("h2",null,"Max price: $"+this.props.data.max_price.toFixed(2)+", min vol: "+this.props.data.min_volume+", price diff: "+100*this.props.data.strike_diff_percent+"%, expire weeks: "+this.props.data.expire_diff_weeks)}}var a,l,c,s;a=options,l=function(e){ReactDOM.render(React.createElement(o,{data:e.filters}),document.getElementById("filter-header"));let t=Object.keys(e.options).sort(),n=document.getElementById("container");for(i in t){let e=document.createElement("li");e.id=t[i],n.appendChild(e)}for(i in t){let n=t[i];ReactDOM.render(React.createElement(r,{symbol:n,rows:e.options[n]}),document.getElementById(n))}},c=function(){var e=document.querySelector("#password-field").value,t=s(e);0==Object.keys(t).length?(document.querySelector("#password-field").style.border="solid #BA466B 1px",document.querySelector("#password-field").style["box-shadow"]="0 0 5px #BA466B"):(l(t),document.querySelector("#login-modal").style.display="none",document.querySelector("#content").style.display="block")},s=function(e){if(!e)return{};e=CryptoJS.enc.Base64.parse(btoa(e));var t=CryptoJS.lib.CipherParams.create({ciphertext:CryptoJS.enc.Base64.parse(a)}),r=CryptoJS.AES.decrypt(t,e,{iv:CryptoJS.enc.Base64.parse(iv)});try{return JSON.parse(r.toString(CryptoJS.enc.Utf8).trim())}catch(e){return{}}},document.querySelector("#password-field").focus(),document.querySelector("#content").style.display="none",document.querySelector("#password-field").addEventListener("keydown",(function(e){13==e.which&&(e.preventDefault(),c())})),document.querySelector("#login-button").addEventListener("click",c)}]);