# Object-detection-level2-cv-19
<br />

## 🔍 Overview
### Background
> 바야흐로 대량 생산, 대량 소비의 시대. 우리는 많은 물건이 대량으로 생산되고, 소비되는 시대를 살고 있습니다. 하지만 이러한 문화는 '쓰레기 대란', '매립지 부족'과 같은 여러 사회 문제를 낳고 있습니다.

<img src='https://camo.githubusercontent.com/86c9fd66258daf9bcaee570f6024589839ca5dfc4efaeaa29f97c9fb82b819a3/68747470733a2f2f692e696d6775722e636f6d2f506e4f6451304c2e706e67' />

> 분리수거는 이러한 환경 부담을 줄일 수 있는 방법 중 하나입니다. 잘 분리배출 된 쓰레기는 자원으로서 가치를 인정받아 재활용되지만, 잘못 분리배출 되면 그대로 폐기물로 분류되어 매립 또는 소각되기 때문입니다.  
> 
> 따라서 우리는 사진에서 쓰레기를 Detection 하는 모델을 만들어 이러한 문제점을 해결해보고자 합니다. 문제 해결을 위한 데이터셋으로는 일반 쓰레기, 플라스틱, 종이, 유리 등 10 종류의 쓰레기가 찍힌 사진 데이터셋이 제공됩니다.  
> 
> 여러분에 의해 만들어진 우수한 성능의 모델은 쓰레기장에 설치되어 정확한 분리수거를 돕거나, 어린아이들의 분리수거 교육 등에 사용될 수 있을 것입니다. 부디 지구를 위기로부터 구해주세요! 🌎

### Dataset
* 전체 이미지 개수: 9754장 (Train 4883장, Test 4871장)
* 10 class: General trash, Paper, Paper pack, Metal, Glass, Plastic, Styrofoam, Plastic bag, Battery, Clothing
* 이미지 크기: (1024, 1024)
* Annotation file: coco format

### 평가 방법
* Test set의 mAP50(Mean Average Precision)로 평가
* Pascal VOC 포맷 사용
* PredictionString = (label, score, xmin, ymin, xmax, ymax), ......


<br />

## 📝 Members
- `권혁산` &nbsp; Detection을 위한 라이브러리 서칭, 라이브러리 사용법 및 협업에 대한 의견 제시, DataCleaning, IOU Sweep 
- `김대유` &nbsp; EDA 및 fiftyone을 이용한 데이터 시각화, 모델 결과 데이터 형식 변경 툴(csv to json), stratified k-fold 데이터 제작   
- `김찬민` &nbsp; 베이스라인코드 모델 이해 및 학습  
- `이상진` &nbsp; mmdetection, k-fold 데이터셋, ensemble, multi-scale  
- `정효재` &nbsp; 모델 학습 및 Augmentation, workspace 생성  

<br />

## 📃 Code Structure
```
.
├── yolov5
│   ├── data
│   ├── train.py
│   ├── detect.py
│   └── val.py
├── mmdetection
│   ├── tools
│   │   └── train.py
│   └── custom_models
│       ├── cascade_swin
│       ├── cascadeB_swin
│       └── faster_rcnn_r101_fpn_1x
├── dataset
└── data_research
    ├── EDA
    │   ├── DataAnalysis.ipynb
    │   ├── fiftyone.ipynb
    │   └── dataview.py
    ├── nms.ipynb
    ├── inference_csvtojson.ipynb
    ├── inference_jsontocsv.ipynb
    └── resize_submission
        └── resize_bbox.py
```


<br />

## 💻 How to use
### mmdetection
```
cd mmdetection
python tools/train.py custom_models/{학습시키고 싶은 모델명}/model.py
```

### yolov5
```
./dataset/images/ 에 test 이미지 폴더와 train 이미지 폴더를 넣어준다
python train.py --entity next_level --batch 16 --epochs 30 --data trash.yaml --weights yolov5s.pt 
```

### EfficientDet
```

```

### Detectron2
```
cd Detectron2
python tools/train_net.py --config-file {Config 파일명}
```

<br />

## Evaluation
### Models
|model name|epoch|submit mAP|K-Fold|Training|
| --- | --- | --- | --- | --- |
|yolo5xl6|150|0.5739||```TTA```|
|EfficientDet|50|0.3598||```SGD``` ```D3```|
|yolov5l6|200||||
|faster rcnn r101 fpn 1x|12|0.4028||```AdamW```|
|cascade swin|32|0.5644|0.5963|```AdamW```|
|cascadeB swin|40|0.6789|||
|UniverseNet|100|0.5564|||

### Ensemble
* soft-NMS
* Threshold 0.52

```
● Final Score
  - Public LB score: mAP 0.6824
  - Private LB score: mAP 0.6663
```



<!-- ### yolov5 데이터 관련
./dataset/imaages/ 에 test 이미지 폴더와 train 이미지 폴더를 넣어주고 학습하면됨 

---
### yolov5 wandb 활성화 하는 방법
termial에서 yolo5폴더 들어가서 wandb online 실행

python train.py --entity next_level --batch 16 --epochs 30 --data trash.yaml --weights yolov5s.pt  -->
