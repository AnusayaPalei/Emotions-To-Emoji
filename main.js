var Prediction1="";
var Prediction2="";
Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

Camera=document.getElementById("camera");
Webcam.attach('#Camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("captured_image").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    })
}

Classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/MaIG7E_k2/model.json',modelloaded);
function modelloaded(){
    console.log('modelloaded');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is "+ Prediction1;
    speak_data2="The second prediction is "+ Prediction2;
    var utterthis= new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis);
}

function predict(){
    img=document.getElementById("captured_img");
    Classifier.classify(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else {console.log(results);
        document.getElementById("emotion_name1").innerHTML= results[0].label;
        document.getElementById("emotion_name2").innerHTML= results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        if(Prediction1=="Happy"){
            document.getElementById("emoji1").innerHTML="&#128522"
        }
        if(Prediction1=="Angry"){
            document.getElementById("emoji1").innerHTML="&#128548"
        }
        if(Prediction1=="Sad"){
            document.getElementById("emoji1").innerHTML="&#128532"
        }

        if(Prediction2=="Happy"){
           document.getElementById("emoji2").innerHTML="&#128522"
       } 
       if(Prediction2=="Angry"){
        document.getElementById("emoji2").innerHTML="&#128548"
       }
       if(Prediction2=="Sad"){
        document.getElementById("emoji2").innerHTML="&#128532"
    }
    speak();
    }
}