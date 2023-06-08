# Object Detection 모델 경량화 - Final Project
<br />

## 🔍 프로젝트 개요
### 목적
- 모델 구조 변형을 통한 YOLOX-nano의 정확도(mAP) 개선
### 활용 장비 및 재료
- 개발 환경 : Aistages server(Tesla v100), VScode, Jupyter NoteBook
- 협업 Tools : Git, GitHub, Wandb, Notion
### 데이터셋 통계
- [Pascal VOC 2007](http://host.robots.ox.ac.uk/pascal/VOC/voc2007/) (20가지 클래스)
- Training set : 5,011장 (VOC 2007 trainval)
- Validaton set : 4,952장 (VOC 2007 test)
<img src='./src/image_1.png' />
<br />

## 📝 프로젝트 팀 구성 및 역할
- `김대유` &nbsp; Backbone 변경 및 Conv 블록 실험   
- `권혁산` &nbsp; 프로젝트 Leading, Pruning, Neck 구조 변형 
- `정효재` &nbsp; Baseline분석, BaseConv 변형 실험
- `이상진` &nbsp; BaseConv 변형하여 실험 진행
- `김찬민` &nbsp; Darknet, base conv 변형 실험  
<br />

## 📆 프로젝트 수행 절차 및 방법
<img src='./src/image_2.png' />
<br />

## 📃 프로젝트 기본 조건
### YOLOX-nano / architecture
- 기본적으로 1 stage detector 구조
- Input – Backbone – Neck – Dense prediction
- Input image가 darknet53의 backbone을 통해 feature map 추출
- pafpn이라는 feature pyramid network로 연결한 후 Output을 통해 prediction을 진행
- head가 2개로 분리된 decoupled head 구조를 통해 prediction을 진행
<img src='./src/image_3.png' />
- YOLOX에서는 head 부분을 분리시켜 Classification과 Localization에 각각 더 적합한 Fully connected head와 convolution head를 적용시킨 decoupled head 방식을 통해 성능 향상을 이끌어 냄
<img src='./src/image_4.png' />
<br />

### YOLOX-nano / Base score
- 실제 성능

|Model|mAP val @.5|mAP val @.5:.95| Params(M)|FLOPs(G)|
| :-: | :-: | :-: | :-: | :-: |
|YOLOX-nano|50.78(50.23, 51.33)|29.44(29.08, 29.80)|0.90|1.05|

- 노타사의 제공 성능

|Model|mAP val @.5|mAP val @.5:.95| Params(M)|FLOPs(G)|
| :-: | :-: | :-: | :-: | :-: |
|YOLOX-nano|50.95|28.47|0.91|1.08|

<br />

## 💻 프로젝트 수행 결과
### 최종 스코어
- 적용 기법
    - Vanilla depthwise convolution 사용
    - Kernel size 조정 
    - Mixed depthwise convolution
    - FPN에 dark2 정보 추가

|Model|mAP val @.5:.95|mAP val @.5| Params(M)|FLOPs(G)|
| :-: | :-: | :-: | :-: | :-: |
|yolox_voc_nano|28.47|50.95|0.91|1.08|
|Final (ours)|32.80 (+4.33%)|53.65 (+2.70%)|0.86 (-5.5%)|1.08 (-)|

<br />

### Backbone
- GhostNet
    - Feature Map 중복(Redundancy)에 대한 연산을 줄이는 방법을 제안
    - Ghost Feature(중복 피쳐)를 Linear transformation을 통해서 만드는 방법을 사용하여 기존 Conv 연산보다 빠르게 생성
    <img src='./src/image_5.png' />
- GhostNet Module Concept 연산 비교
    - 기존 C개의 Feature를 만들던 연산을 M개로 줄이고 M개의 Feature를 이용해 각 (S-1)개의 Feature를 만든다. 그후 기존 M과 M*(S-1)를 더해 총 C개의 Feature를 만든다
    <img src='./src/image_6.png' />
- Ghost Bottleneck (G-bneck)
    - ResNet에서의 Residual Block과 유사하게 Ghost Module 2개를 쌓아서 Ghost Bottleneck (G-bneck)을 구성
    - Stride = 1이면 왼쪽 형태로 Stride = 2이면 오른쪽 형태로 구성
    <img src='./src/image_7.png' />

<br />

### Depthwise Convolution
- 기존의 vanilla depthwise convolution + pointwise convolution인 depthwise seperable convolution을 vanilla depthwise convolution으로 교체
- Params는 0.91에서 0.68, GFlops는 1.08에서 0.83으로 줄어드는 효과
- 줄어든 params와 gflops에서 이득을 보기 위하여 backbone, neck의 convolution 연산의 커널 사이즈를 3x3에서 7x7로 변경
- Head의 convolution 연산의 커널 사이즈를 3x3에서 5x5로 변경
- 커널의 크기가 올라가면서 성능이 크게 향상됨

|Model|mAP val @.5:.95|mAP val @.5| Params(M)|FLOPs(G)|
| :-: | :-: | :-: | :-: | :-: |
|yolox_voc_nano|28.47|50.95|0.91|1.08|
|DWConv (ours)|31.68 (+3.21%)|53.65 (+3.15%)|0.88 (-3.3%)|1.08 (-)|

<br />

### Mixed Depthwise Convolution
- 커널의 사이즈를 키우면 성능이 올라가는건 이미 다양한 연구에서 입증된 결과
- High-resolution pattern 학습을 위한 큰 사이즈의 커널과 low-resolution pattern 학습을 위한 작은 사이즈의 커널 모두 사용하여 학습을 시킬 수 있는 mixed depthwise convolution을 사용
<img src='./src/image_8.png' />
- YOLOX nano 모델의 backbone인 CSPDarknet53의 dark2에는 {3x3, 5x5} 적용, dark3 ~ dark5에는 {3x3, 5x5, 7x7, 9x9} 적용
- 결과적으로 high-resolution pattern과 low-resolution pattern 모두 적절히 학습시킬 수 있었고, 기존에 한 종류 크기의 커널만 사용했을 때보다 성능이 대폭 향상됨

|Model|mAP val @.5:.95|mAP val @.5| Params(M)|FLOPs(G)|
| :-: | :-: | :-: | :-: | :-: |
|yolox_voc_nano|28.47|50.95|0.91|1.08|
|MDConv (ours)|31.53 (+3.06%)|52.86 (+2.36%)|0.90 (-1.1%)|1.05 (-3.1%)|

<br />

### FPN
- YOLOX-nano 모델은 PAFPN을 NECK으로 사용.
- Backbone은 PAFPN에 Dark3,4,5 레이어의 Output을 전달.
- 이를 이용해 Head에 3개의 Output을 전달함.
- 하지만 과정중 Dark2의 정보가 소실됨.
    - EfficientDet 논문에서 더 많은 레이어의 정보를 전달 할수록 성능이 좋아짐.
<img src='./src/image_9.png' height='500' />
    
- Dark2의 정보를 더해주어 성능 향상을 꾀함.
<img src='./src/image_10.png' height='500' />

|Model|mAP val @.5:.95|mAP val @.5| Params(M)|FLOPs(G)|
| :-: | :-: | :-: | :-: | :-: |
|yolox_voc_nano|28.47|50.95|0.91|1.08|
|FPN_Modified (ours)|29.56 (+1.11%)|51.89 (+0.94%)|0.91 (-)|1.06 (-2.1%)|

<br />

## 💡 Insight
### Pruning
- Pruning은 기존에 pretrained된 모델을 pruning후 재학습시키는 것을 반복.
<img src='./src/image_11.png' />

- Pruning 한 모델과 다시 학습시킨 기본 모델의 성능차가 거의 없음을 확인 할 수 있었음.
<img src='./src/image_12.png' />

### Learning Rate
- Nota사에서 제공한 Pre-trained.pth파일을 이용해 재학습시에 성능이 10% 향상
- Epoch 끝부분에서 mAP Score가 진동하면 학습이 끝난 것인가 → No!
<img src='./src/image_13.png' />
- Epoch에 따른 Learning Rate가 급감함.
- 낮은 Learning Rate로 Local Maximum을 벗어나지 못하고 진동.
- 결국 충분한 학습이 되지 않아서 이런 현상 발생.
<img src='./src/image_14.png' />

<br />

## 📔 자체 평가 의견
- 계획 대비 달성도
    - 여러가지 경량화 기법을 사용하여 최대 4.33%p 성능을 향상시키는데 성공함.
- 잘한 점
    - Notion, Wandb, Github 등 다양한 툴을 통하여 효율적인 협업을 진행하였음.
    - 여러 논문을 탐색하며 경량화 기법을 코드로 직접 구현하였음.
    - 모델을 Core를 직접 뜯어보고 분석하며 모델 구현 능력 증진 및 이해 증대.
- 시도했으나 잘 되지 않았던 것들
    - Convolution을 BottleNeck으로 변경하였으나 성능이 하락함.
- 아쉬운 점
    - 본 프로젝트의 목표는 모델 구조를 변경하여 모델의 성능을 향상시키는 것인 만큼 hyper parameter에 너무 엄격한 제약사항이 있었음. 다양한 backbone에 맞는 epoch을 유연하게 늘린다던가 learning rate를 바꾼다던 등 더 다양한 변화를 줄 수 있었으면 어떨까 하는 아쉬움이 있음.
- 배운 점
    - 모델경량화에 대한 폭넓은 경험과 Insight를 가지게 되었음.
    - 모델을 직접 구현하고 뜯어보며 모델 구현 능력을 키움.
    - Template Core부분을 직접 고치면서 단순한 이용만이 아닌 설계를 경험함.
