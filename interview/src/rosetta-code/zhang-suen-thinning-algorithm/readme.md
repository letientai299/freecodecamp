# Zhang-Suen thinning algorithm

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/zhang-suen-thinning-algorithm)

This is an algorithm used to thin a black and white i.e. one bit per pixel
images. For example, with an input image of:

################# ############# ################## ################
################### ################## ######## ####### ###################

######

######

################# ####### ################ ####### ################# #######

######

######

######

######## ####### ################### ######## ####### ######
################## ###### ######## ####### ###### ################ ######
######## ####### ###### ############# ######

It produces the thinned output:

    # ##########                       #######
     ##        #                   ####       #
     #          #                 ##
     #          #                #
     #          #                #
     #          #                #
     ############               #
     #          #               #
     #          #                #
     #          #                #
     #          #                #
     #                            ##
     #                             ############
                       ###                          ###

## Algorithm

Assume black pixels are one and white pixels zero, and that the input image is a
rectangular N by M array of ones and zeroes. The algorithm operates on all black
pixels P1 that can have eight neighbours. The neighbours are, in order, arranged
as:

<table border="3"><tbody><tr><td style="text-align: center;">P9</td><td style="text-align: center;">P2</td><td style="text-align: center;">P3</td></tr><tr><td style="text-align: center;">P8</td><td style="text-align: center;"><strong>P1</strong></td><td style="text-align: center;">P4</td></tr><tr><td style="text-align: center;">P7</td><td style="text-align: center;">P6</td><td style="text-align: center;">P5</td></tr></tbody></table>

Obviously the boundary pixels of the image cannot have the full eight
neighbours.

- Define $A(P1)$ = the number of transitions from white to black, (0 -> 1) in
  the sequence P2, P3, P4, P5, P6, P7, P8, P9, P2. (Note the extra P2 at the
  end - it is circular).
- Define $B(P1)$ = the number of black pixel neighbours of P1. ( = sum(P2 .. P9)
  )

**Step 1:**

All pixels are tested and pixels satisfying all the following conditions
(simultaneously) are just noted at this stage.

1.  The pixel is black and has eight neighbours
2.  $2 <= B(P1) <= 6$
3.  $A(P1) = 1$
4.  At least one of **P2, P4 and P6** is white
5.  At least one of **P4, P6 and P8** is white

After iterating over the image and collecting all the pixels satisfying all step
1 conditions, all these condition satisfying pixels are set to white.

**Step 2:**

All pixels are again tested and pixels satisfying all the following conditions
are just noted at this stage.

1.  The pixel is black and has eight neighbours
2.  $2 <= B(P1) <= 6$
3.  $A(P1) = 1$
4.  At least one of **P2, P4 and P8** is white
5.  At least one of **P2, P6 and P8** is white

After iterating over the image and collecting all the pixels satisfying all step
2 conditions, all these condition satisfying pixels are again set to white.

**Iteration:**

If any pixels were set in this round of either step 1 or step 2 then all steps
are repeated until no image pixels are so changed.
