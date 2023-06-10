# Data-annotation-level2-cv-19



## 🔍 Overview
### Background
> 스마트폰으로 카드를 결제하거나, 카메라로 카드를 인식할 경우 자동으로 카드 번호가 입력되는 경우가 있습니다. 또 주차장에 들어가면 차량 번호가 자동으로 인식되는 경우도 흔히 있습니다. 이처럼 OCR (Optimal Character Recognition) 기술은 사람이 직접 쓰거나 이미지 속에 있는 문자를 얻은 다음 이를 컴퓨터가 인식할 수 있도록 하는 기술로, 컴퓨터 비전 분야에서 현재 널리 쓰이는 대표적인 기술 중 하나입니다.

![img1](https://raw.githubusercontent.com/hn04147/level2-data-annotation_cv-level2-cv-19/master/code/image1.png)

> OCR task는 글자 검출 (text detection), 글자 인식 (text recognition), 정렬기 (Serializer) 등의 모듈로 이루어져 있습니다. 본 대회는 아래와 같은 특징과 제약 사항이 있습니다.
> * 본 대회에서는 '글자 검출' task 만을 해결하게 됩니다.
> * 예측 csv 파일 제출 (Evaluation) 방식이 아닌 model checkpoint 와 inference.py 를 제출하여 채점하는 방식입니다. (Inference) 상세 제출 방법은 AI Stages 가이드 문서를 참고해 주세요!
> * 대회 기간과 task 난이도를 고려하여 코드 작성에 제약사항이 있습니다. 상세 내용은 베이스라인 코드 탭 하단의 설명을 참고해주세요.

### Dataset
* ```input/dat/ICDAR17_Korean``` 경로에 위치한 ICDAR17_Korean 데이터셋을 사용한다.
* UFO 형식의 annotation 파일인 ```ufo/train.json``` 과 이미지 파일들이 포함되어있는 ```images/``` 폴더로 구성되어있다.
* ```ICDAR17_MLT``` 원본 데이터셋은 총 9000개의 샘플(training 7200 + validation 1800)로 구성되어 있으며, ```ICDAR17_Korean``` 은 이 중 536개의 샘플로만 구성된 부분 데이터셋이다.

### 평가방법
* 모든 정답/예측 박스들에 대해서 Area Recall, Area Precision을 미리 계산해낸다.

![img2](https://raw.githubusercontent.com/hn04147/level2-data-annotation_cv-level2-cv-19/master/code/image2.png)

* 모든 정답 박스와 예측 박스를 순회하면서, 매칭이 되었는지 판단하여 박스 레벨로 정답 여부를 측정한다.
* 모든 이미지에 대하여 Recall, Precision을 구한 이후, 최종 F1-Score은 모든 이미지 레벨에서 측정 값의 평균으로 측정됩니다.



## 📝 Members
- `권혁산` &nbsp; Visualization 코드 작성, F1 Score 향상, 데이터 코드 전처리
- `김대유` &nbsp; EAST model 및 프로젝트 구조 이해
- `김찬민` &nbsp; ICDAR17_MLT 데이터셋 다운로드, ICDAR17 ,19 학습
- `이상진` &nbsp; ICDAR19_MLT 데이터셋 다운로드, ICDAR19_MLT 학습
- `정효재` &nbsp; Practice Dataset, EDA & Debugging



## 📃 Code Structure
```
.
├─ code
│  ├─ model.py
│  ├─ loss.py
│  ├─ train.py
│  ├─ inference.py
│  ├─ dataset.py
│  ├─ detect.py
│  ├─ deteval.py
│  ├─ east_dataset.py
│  ├─ convert_mlt.py
│  ├─ convert_mlt_19.py
│  ├─ OCR_EDA.ipynb
│  ├─ requirements.txt
│  └─ download_ICDAR19_MLT.sh
└─ visualization.py
```



## 📃 Data Structure
```
└─ /opt/ml
    ├─ code
    │   ├─ train.py
    │   └─ trained_models
    │       └─ latest.pth
    └─ input/data
        ├─ ICDAR2017_Korean
        │   ├─ ufo
        │   │    └─ train.json
        │   └─ images
        │           ├─ img_1001.jpg
        │           ├─ img_1002.jpg
        │           ├─ img_1003.jpg
        │           ├─ ...
        │           └─ img_4700.jpg
        └─ ICDAR19_MLT
            ├─ ufo
            │    └─ train.json
            └─ images
                    ├─ tr_img_00001.jpg
                    ├─ tr_img_00002.jpg
                    ├─ tr_img_00003.jpg
                    ├─ ...
                    └─ tr_img_10000.jpg
```



## 💻 How to use
##### Install libraries
```
pip install -r requirement.txt

apt-get update
apt-get install ffmpeg libsm6 libxext6 -y
```

##### Download ICDAR19_MLT
```
mkdir /opt/ml/input/data/ICDAR19_MLT
mkdir /opt/ml/input/data/ICDAR19_MLT/images /opt/ml/input/data/ICDAR_MLT/ufo

sh download_ICDAR19_MLT.sh
```

##### Convert ICDAR19_MLT to UFO format
```
python convert_mlt_19.py
```

##### Train
```
python train.py --data_dir {데이터셋 주소} --learning_rate 1e-3 --batch_size 32 --max_epoch 200 
                --wandb_name {Wandb 프로젝트 이름}
```

##### Visualization
```
python visualization.py --root_dir {데이터셋 주소} 
```



## 🏆 Evaluation

|dataset|epoch|learning rate|recall|precision|public f1|private f1|
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|ICDAR17 Korean|200|1e-3|0.3461|0.6825|0.4593|0.4433|
|ICDAR17 Korean|1000|5e-4|0.4560|0.7469|0.5663|0.5099|
|ICDAR19 MLT|260|5e-4|0.5821|0.8068|0.6763|0.6629|
|ICDAR19 MLT|100|1e-3|0.6007|0.7937|0.6838|0.6720|
|ICDAR17|230|1e-3|0.6040|0.8385|0.7022|0.6949|

#### Final Score
| |Public LB|Private LB|
| :--: | :--: | :--: |
|f1 score|0.7022|0.6949|
|recall|0.6040|0.6175|
|precision|0.8385|0.7945|

