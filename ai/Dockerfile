FROM tensorflow/tensorflow:latest-jupyter@sha256:15ca1ea5083f1f9fcc2b006df4f1d51c3d0b6f2616fa14c12ff6dc7c4bc83588
RUN apt-get update -qq \
  && apt-get install -y -qq wget unzip python-scipy \
  && pip install -U scipy pandas scikit-learn numpy

