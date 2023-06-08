# HYU-Capston-Project

Research field: Computer Vision  
Keywords: Object detection, Inpainting

by Chaea Kim, Sangjin Lee

- Duration: 2022.08 ~ 2023.05  
- Subject: Photo retouching that can remove specific objects



### How to use
- [Object detection - YOLOv5](./mask_generation/yolov5/README.md)
- [Image inpainting - Lama](./Inpainting/lama/README.md)


The images below compare the results of different inpainting models: Lama with refinement, Lama w/o refinement, Deepfillv2, GIN  
In addition, we compared the results of applying various values ​​of ksize, which is a dilation parameter.

[1] Landscape  
mask generation: yolov5 (Segmentation class: person, ski)  
Lama w/ refinement parameter
```
    iter: 15
    lr: 0.002
    min_side: 512
    max_scales: 3
    px_budget: 1800000
```
<p align="center">
  <img src="https://github.com/2018007956/HYU-Capstone-Project/assets/48304130/b9c846d9-6b54-48d9-905c-5b13f9dfdd15" weight="100">

<p align="left">
[2] food</br>
mask generation: yolov5 (Segmentation class: banana)
<p align="center">
  <img src="https://github.com/2018007956/HYU-Capstone-Project/assets/48304130/141aa3a2-4d80-4125-a08e-a2064588adbe" weight="200">

<p align="left">
[3] people</br>
mask generation: user input 
<p align="center">
<img src="https://github.com/2018007956/HYU-Capstone-Project/assets/48304130/45222cb4-67f2-41b8-9626-3a30722839d5" weight="500">


## References
YOLOv5) https://github.com/ultralytics/yolov5  
Lama) https://github.com/saic-mdal/lama