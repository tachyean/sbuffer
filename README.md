## SBuffer (static buffer)
SBuffer is a class to manage buffers from the same memory allocation.

    npm install sbuffer

Include SBuffer class

    var SBuffer=require('sbuffer');
    
Allocate 100 total memory, where 100/3 or 33 bytes are for garbage use

    var sb=new SBuffer(100,3);
Write string "test" named "v1"

    sb.write('test','v1');
Read "v1" buffer

    console.log(sb.read('v1').toString());/*print: test*/
    
Mark "v1" as deleted

    sb.delete('v1');

Read "v1" buffer after

    console.log(sb.read('v1'));/*print: undefined*/
