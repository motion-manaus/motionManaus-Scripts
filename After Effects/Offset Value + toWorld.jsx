L = thisComp.layer(index-1); // variavel pra puxar o position da layer acima
r = L.sourceRectAtTime(time,true) // faço a minima ideia, mas puxa a posição "correta" da layer
t = thisComp.layer("data-stream-B.Null1").effect("Slider Control")("Slider"); // slider pra controlar offset do tempo, tem que trocar o "data-stream-B.Null1" pelo o null que você preferir
L.toWorld([r.left + r.width/2,r.top + r.height/2],time-t); // toWorld posiciona a layer da forma correta, não faça perguntas, só aceita
