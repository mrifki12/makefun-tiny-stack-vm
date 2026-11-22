import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs'
function run(p,e){
let F=n=>new Int32Array(n),D=F(256),C=F(64),M=F(256),w=new Uint8Array(65536),n=p.length,s=0,k=0,l=0,i=0,pc=0,t=0
let E=c=>[w.slice(0,l),c]
for(;;){
if(t>999999)return E(10)
if(pc<0||pc>=n)return E(9)
let o=p[pc]
if(o>7&&o<16||o==31||o>34&&o<48||o>52&&o<64||o>65&&o<80||o>83)return E(5)
let m=o==1?1:o==2?4:o>>2==12?2:0
if(pc+m>=n)return E(9)
t++
let q=2,u=1
if(o<8){q=+"00011223"[o];u=+"01102233"[o]}
else if(o==23||o==27)q=1
else if(o>47&&o<53){q=o>48&&o<51?1:0;u=0}
else if(o==64)q=1
else if(o==65)u=0
else if(o>79){q=o!=82;u=o==82}
if(s<q)return E(2)
if(s-q+u>256)return E(3)
let x=pc+1+m;pc=x
if(o==0)return E(0)
else if(o==1)D[s++]=(p[x-1]<<24)>>24
else if(o==2)D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24
else if(o==3)s--
else if(o==4)D[s]=D[s-1],s++
else if(o==5){let v=D[s-1];D[s-1]=D[s-2];D[s-2]=v}
else if(o==6)D[s]=D[s-2],s++
else if(o==7){let v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v}
else if(o==23)D[s-1]=-D[s-1]
else if(o==27)D[s-1]=~D[s-1]
else if(o>79){
if(o==82)D[s++]=i<e.length?e[i++]:-1
else if(o==83)return E(D[s-1]&255)
else if(o==80){let v=''+D[s-1];if(l+v.length>65536)return E(11);s--;for(let j=0;j<v.length;)w[l++]=v.charCodeAt(j++)}
else{if(l>65535)return E(11);w[l++]=D[--s]&255}
}
else if(o>63){let v=D[s-1];if(v>>>8)return E(6);if(o==64)D[s-1]=M[v];else{M[v]=D[s-2];s-=2}}
else if(o>47){
let r=((p[x-2]|p[x-1]<<8)<<16)>>16
if(o==48)pc=x+r
else if(o==51){if(k>63)return E(7);C[k++]=x;pc=p[x-2]|p[x-1]<<8}
else if(o==52){if(!k)return E(8);pc=C[--k]}
else if(o==49?D[--s]==0:D[--s]!=0)pc=x+r
}
else{
let b=D[--s],a=D[s-1]
if(o==16)D[s-1]=a+b
else if(o==17)D[s-1]=a-b
else if(o==18)D[s-1]=Math.imul(a,b)
else if(o==19){if(!b)return E(4);D[s-1]=(a/b)|0}
else if(o==20){if(!b)return E(4);D[s-1]=a%b}
else if(o==21){if(!b)return E(4);D[s-1]=(a>>>0)/(b>>>0)|0}
else if(o==22){if(!b)return E(4);D[s-1]=(a>>>0)%(b>>>0)}
else if(o==24)D[s-1]=a&b
else if(o==25)D[s-1]=a|b
else if(o==26)D[s-1]=a^b
else if(o==28)D[s-1]=a<<b
else if(o==29)D[s-1]=a>>b
else if(o==30)D[s-1]=a>>>b
else if(o==32)D[s-1]=a==b?1:0
else if(o==33)D[s-1]=a<b?1:0
else D[s-1]=(a>>>0)<(b>>>0)?1:0
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
for(let id of b(I).sort()){
let r=run(new Uint8Array(c(I+'/'+id+'/program.bin')),new Uint8Array(c(I+'/'+id+'/input.bin'))),z=O+'/'+id
a(z,{recursive:true})
d(z+'/stdout.bin',r[0])
d(z+'/exit.txt',r[1]+'\n')
}
