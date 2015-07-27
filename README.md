## SBuffer (static buffer)
SBuffer is a class to manage buffers from the same memory allocation.

    npm install sbuffer

Example:

    var SBuffer=require('sbuffer'),/*include SBuffer class*/
    /*allocate 100 total memory, where 100/3 or 33 bytes are for garbage*/
    sb=new SBuffer(100,3);
    /*write String "test" in sb memory, named "v1"*/
    sb.write('test','v1');
    /*read "v1" buffer, print: test*/
    console.log(sb.read('v1').toString());
    /*mark "v1" deleted*/
    sb.delete('v1');
    /*print: undefined*/
    console.log(sb.read('v1'));
