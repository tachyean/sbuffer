## SBuffer (static buffer)
SBuffer is a class to manage buffers from the same memory allocation.

    npm install sbuffer

Example:

    var SBuffer=require('sbuffer'),/*include SBuffer class*/
    sb=new SBuffer(100,3);/*alloc 100 total, 100/3 or 33 bytes are for garbage*/
    sb.write('test','v1');/*write String "test" in sb memory, named "v1"*/
    console.log(sb.read('v1').toString());/*read "v1" buffer, print: test*/
    sb.delete('v1');/*mark "v1" deleted*/
    console.log(sb.read('v1'));/*print: null*/
