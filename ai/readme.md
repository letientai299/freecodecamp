# AI local development setup

It's good that for the final projects, FCC provide some template on Google Colab
to getting started. But I can't stand waiting for the cloud server to run, and
for these final projects, the amount of data is not that big to put on the
cloud. So I decided to do it locally, with tensorflow and jupyter run within
docker.

See the
[`Dockerfile`](https://github.com/letientai299/freecodecamp/blob/master/ai/Dockerfile)
for more details.

To start Jupyter server in docker with provided tensorflow and other python libs
needed for this course.

```sh
# build the image and name it "tf"
$ docker build -t tf .

# run the image we just built, expose jupyter web port 8888
# don't use detach mode, as we need to see the token to connect
# from Pycharm.
$ docker run --rm -v $PWD:/tf/ai -p 8888:8888 --name tf tf
```

Now, we can copy the notebook from provided Colab links and work locally.

Note that for some notebook in this folder, if you look at the Github version,
it might not run successfullly due to wget might fail to download full zip file.
For that case, see my rendered HTML versions on the
[main page](https://letientai.io/freecodecamp) or import it and run it on Colab
instead.

Finally, if you're going to work with jupyter within docker, then make sure to
give docker more memory. I got "kernel die" repeatedly with 2GB mem on my Mac.
