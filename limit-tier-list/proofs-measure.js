window.THEOREM_PROOFS = {
  "mct": {
    "idea": "Approximate the limit from below by a simple function. Every piece of that simple function is eventually almost covered by the increasing sequence.",
    "uses": [
      "Definition of the nonnegative Lebesgue integral",
      "Continuity from below of measures"
    ],
    "steps": [
      [
        "Reduce to a pointwise increasing sequence",
        "The hypotheses hold outside a single null set (take the union of the countably many exceptional sets). Redefine all functions there as zero. This does not change their integrals. We may now assume $0\\le f_1\\le f_2\\le\\cdots$ and $f_n(x)\\to f(x)$ everywhere. The pointwise limit is measurable."
      ],
      [
        "Get the easy inequality",
        "By monotonicity of the integral, $$0\\le\\int_X f_n\\,d\\mu\\le\\int_X f\\,d\\mu.$$ The sequence of integrals is increasing, so its extended limit $L=\\sup_n\\int_X f_n\\,d\\mu$ exists and satisfies $L\\le\\int_X f\\,d\\mu$. The difficult part is proving the opposite inequality."
      ],
      [
        "Test against a simple function",
        "Fix a finite-valued nonnegative simple function $s\\le f$ and a number $0<c<1$. Write $$s=\\sum_{j=1}^k a_j\\mathbf1_{A_j},$$ with disjoint measurable $A_j$ and $a_j>0$. Define $$E_n=\\{x:f_n(x)\\ge cs(x)\\}.$$ Since $f_n$ increases, $E_n$ increases. At any point with $s(x)>0$, the limit of $f_n(x)$ is at least $s(x)>cs(x)$, so eventually $x\\in E_n$. Thus $A_j\\cap E_n\\uparrow A_j$ for each $j$."
      ],
      [
        "Transfer the coverage to integrals",
        "On $E_n$ we have $f_n\\ge cs$, and elsewhere $f_n\\ge0$. Hence $$\\int_X f_n\\,d\\mu\\ge c\\int_X s\\mathbf1_{E_n}\\,d\\mu.$$ By continuity from below of measures, $$\\mu(A_j\\cap E_n)\\uparrow\\mu(A_j).$$ Since there are finitely many nonnegative terms, $$\\begin{aligned}\\int_X s\\mathbf1_{E_n}\\,d\\mu&=\\sum_{j=1}^k a_j\\mu(A_j\\cap E_n)\\\\&\\longrightarrow\\int_X s\\,d\\mu.\\end{aligned}$$ Taking limits gives $L\\ge c\\int_X s\\,d\\mu$, also when that integral is infinite."
      ],
      [
        "Recover the entire limit",
        "Let $c\\uparrow1$ to get $L\\ge\\int_X s\\,d\\mu$. This holds for every nonnegative simple $s\\le f$. By the definition of the Lebesgue integral as a supremum over such simple functions, $$L\\ge\\sup_{0\\le s\\le f}\\int_X s\\,d\\mu=\\int_X f\\,d\\mu.$$ Together with Step 2 this proves equality. No finiteness assumption was used."
      ]
    ],
    "key": "Monotonicity creates increasing measurable sets, and continuity from below of the measure supplies the missing reverse inequality. This does not use the monotone convergence theorem itself."
  },
  "fatou": {
    "idea": "Replace the original, possibly oscillating sequence by its increasing lower envelope, so monotone convergence becomes available.",
    "uses": [
      "Monotone convergence theorem"
    ],
    "steps": [
      [
        "Build the tail infimum",
        "For each $n$, define $$g_n(x)=\\inf_{k\\ge n}f_k(x).$$ It is measurable: for every real $a$, $\\{g_n<a\\}=\\bigcup_{k\\ge n}\\{f_k<a\\}$. Nonnegativity gives $g_n\\ge0$. Removing the first member of a tail cannot decrease its infimum, so $g_n\\le g_{n+1}$."
      ],
      [
        "Identify its increasing limit",
        "By the definition of the lower limit, $$\\lim_{n\\to\\infty}g_n(x)=\\sup_n\\inf_{k\\ge n}f_k(x)$$ $$=\\liminf_{n\\to\\infty}f_n(x).$$ Thus the monotone convergence theorem applies to $g_n$, even though it may not apply to $f_n$ itself: $$\\int_X\\liminf_n f_n\\,d\\mu=\\lim_n\\int_X g_n\\,d\\mu.$$"
      ],
      [
        "Compare each lower envelope with its tail",
        "For every $k\\ge n$, the definition of infimum gives $g_n\\le f_k$. Integrating yields $\\int_X g_n\\,d\\mu\\le\\int_X f_k\\,d\\mu$. The left side does not depend on $k$, so $$\\int_X g_n\\,d\\mu\\le\\inf_{k\\ge n}\\int_X f_k\\,d\\mu.$$"
      ],
      [
        "Take the remaining limit",
        "Both sides of the last inequality increase with $n$. Passing to their extended limits, $$\\int_X\\liminf_n f_n\\,d\\mu$$ $$\\le\\lim_n\\inf_{k\\ge n}\\int_X f_k\\,d\\mu$$ $$=\\liminf_n\\int_X f_n\\,d\\mu.$$ This is precisely Fatou's inequality. We never subtracted infinite quantities."
      ]
    ],
    "key": "The tail infimum lies below every sufficiently late term. Therefore the comparison is one-sided; the proof supplies an inequality, not an equality."
  },
  "dct": {
    "idea": "Apply Fatou not to the error itself, but to the space left underneath an integrable envelope. That turns a lower bound into an upper bound.",
    "uses": [
      "Fatou’s lemma",
      "Triangle inequality for integrals"
    ],
    "steps": [
      [
        "Establish integrability of the limit",
        "Work outside a common null set on which convergence and domination hold. Taking limits in $|f_n|\\le g$ gives $|f|\\le g$. Thus $f_n$ and $f$ are integrable, since $\\int g\\,d\\mu<\\infty$. In particular all their integrals are finite."
      ],
      [
        "Introduce the absolute error",
        "Let $$h_n=|f_n-f|.$$ Then $h_n\\to0$ almost everywhere and the triangle inequality gives $$0\\le h_n\\le |f_n|+|f|\\le2g.$$ Our stronger goal is $\\int h_n\\,d\\mu\\to0$. This would also imply convergence of the original integrals."
      ],
      [
        "Apply Fatou to the complementary error",
        "Put $q_n=2g-h_n$. These functions are nonnegative and $q_n\\to2g$ almost everywhere. Fatou gives $$\\int 2g\\,d\\mu\\le\\liminf_n\\int q_n\\,d\\mu.$$ Put $C=2\\int g\\,d\\mu<\\infty$. By linearity $\\int q_n\\,d\\mu=C-\\int h_n\\,d\\mu$. For a fixed finite $C$, $$\\liminf_n(C-a_n)=C-\\limsup_n a_n.$$ Consequently $$C\\le C-\\limsup_n\\int h_n\\,d\\mu.$$"
      ],
      [
        "Deduce convergence in the integral norm",
        "Subtract $C$ from both sides. This is legitimate because $C$ is finite. We obtain $$\\limsup_n\\int h_n\\,d\\mu\\le0.$$ Each integral is nonnegative, hence its lower limit is at least zero. The lower and upper limits agree, giving $$\\lim_n\\int |f_n-f|\\,d\\mu=0.$$"
      ],
      [
        "Pass to the signed or complex integral",
        "By linearity and the integral triangle inequality, $$\\begin{aligned}\\left|\\int f_n\\,d\\mu-\\int f\\,d\\mu\\right|&=\\left|\\int(f_n-f)\\,d\\mu\\right|\\\\&\\le\\int|f_n-f|\\,d\\mu.\\end{aligned}$$ The right side tends to zero by Step 4. Thus both asserted conclusions hold."
      ]
    ],
    "key": "The finiteness of the dominating integral is what lets us subtract the constant after applying Fatou. Without it, the argument would involve an undefined difference of infinities."
  },
  "tonelli": {
    "idea": "Prove the identity first for rectangles, then measurable sets, then simple functions, and finally arbitrary nonnegative functions by increasing approximation.",
    "uses": [
      "Product measure on rectangles",
      "π–λ theorem (Dynkin systems)",
      "Monotone convergence theorem"
    ],
    "steps": [
      [
        "Start with finite measure spaces and rectangles",
        "Assume first $\\mu(X),\\nu(Y)<\\infty$. For a product-measurable set $E$, write $E_x=\\{y:(x,y)\\in E\\}$. Every such section is measurable, because the sets with measurable sections form a sigma-algebra containing rectangles. For $E=A\\times B$, $$\\nu(E_x)=\\mathbf1_A(x)\\nu(B).$$ This is measurable, and $$\\int_X\\nu(E_x)\\,d\\mu=\\mu(A)\\nu(B)$$ $$=(\\mu\\times\\nu)(E).$$ The same holds in the opposite order."
      ],
      [
        "Extend the rectangle identity to measurable sets",
        "Let $\\mathcal D$ consist of sets $E$ for which $x\\mapsto\\nu(E_x)$ is measurable and the identity above holds. The whole space is in $\\mathcal D$. If $E\\in\\mathcal D$, then $\\nu((E^c)_x)=\\nu(Y)-\\nu(E_x)$, so measurability and the identity pass to complements by subtraction of finite quantities. For pairwise disjoint $E_j\\in\\mathcal D$, $$\\nu\\bigl((\\bigcup_j E_j)_x\\bigr)=\\sum_j\\nu((E_j)_x).$$ Monotone convergence for the partial sums and countable additivity of product measure give the identity for the union. Thus $\\mathcal D$ is a Dynkin system. The rectangles are closed under finite intersections and generate the product sigma-algebra. The π–λ theorem implies that $\\mathcal D$ contains every product-measurable set. Repeat with $X,Y$ interchanged."
      ],
      [
        "Move from indicators to simple functions",
        "If $s=\\sum_{j=1}^k a_j\\mathbf1_{E_j}$ with $a_j\\ge0$, each inner integral is a finite sum of measurable section measures. By the set identity and finite linearity, $$\\int_{X\\times Y}s\\,d(\\mu\\times\\nu)$$ $$=\\int_X\\left(\\int_Y s(x,y)\\,d\\nu\\right)d\\mu.$$ The reverse order follows identically."
      ],
      [
        "Pass to an arbitrary nonnegative function",
        "Choose measurable nonnegative simple functions $s_n\\uparrow f$ (for example, truncate and approximate from below by dyadic steps). By monotone convergence on each section, $$\\int_Y s_n(x,y)\\,d\\nu\\uparrow\\int_Y f(x,y)\\,d\\nu.$$ The latter is measurable as an increasing limit of measurable functions. Apply monotone convergence on the product space and on the outer space, using Step 3: $$\\begin{aligned}\\int_{X\\times Y} f\\,d(\\mu\\times\\nu)&=\\lim_n\\int_{X\\times Y}s_n\\,d(\\mu\\times\\nu)\\\\&=\\lim_n\\int_X\\int_Y s_n\\,d\\nu\\,d\\mu\\\\&=\\int_X\\int_Y f\\,d\\nu\\,d\\mu.\\end{aligned}$$ All quantities are nonnegative; infinity is allowed."
      ],
      [
        "Remove the finite-measure restriction",
        "By sigma-finiteness choose increasing measurable sets $X_n\\uparrow X$, $Y_n\\uparrow Y$, each of finite measure. Apply the finite case to $f\\mathbf1_{X_n\\times Y_n}$. Its section integrals are measurable on $X$ (extend them by zero outside $X_n$), and the functions increase to $f$. The three applications of monotone convergence from Step 4 now give the result on $X\\times Y$. The other order follows by symmetry."
      ]
    ],
    "key": "Nonnegativity allows every approximation and interchange to be handled by monotone convergence without subtracting infinities. Sigma-finiteness permits localization to finite rectangles."
  },
  "fubini": {
    "idea": "Tonelli already handles nonnegative functions. Absolute integrability makes it safe to split a signed function into positive and negative parts and subtract.",
    "uses": [
      "Tonelli’s theorem",
      "Decomposition into positive and negative parts"
    ],
    "steps": [
      [
        "Control the absolute value of each section",
        "Apply Tonelli to the nonnegative measurable function $|f|$. The hypothesis gives $$\\int_X\\left(\\int_Y|f(x,y)|\\,d\\nu\\right)d\\mu<\\infty.$$ Let $H(x)=\\int_Y|f(x,y)|\\,d\\nu$. Tonelli ensures that $H$ is measurable. A nonnegative measurable function with finite integral is finite almost everywhere: if $H=\\infty$ on a set of positive measure, its integral is at least $M$ times that measure for every $M>0$. Thus $f(x,\\cdot)$ is integrable for almost every $x$. Interchange the variables to obtain the other section property."
      ],
      [
        "Split the real function into nonnegative pieces",
        "For real $f$, define $f^+=\\max(f,0)$ and $f^-=\\max(-f,0)$. Then $$f=f^+-f^-,\\qquad |f|=f^++f^-.$$ Both pieces have finite product integrals, since they are bounded by $|f|$. Tonelli applies to each of them separately."
      ],
      [
        "Subtract the two Tonelli identities",
        "For either sign, $$\\int_{X\\times Y} f^\\pm\\,d(\\mu\\times\\nu)$$ $$=\\int_X\\left(\\int_Y f^\\pm(x,y)\\,d\\nu\\right)d\\mu.$$ Both inner integrals are finite for almost every $x$ by Step 1. Their difference is measurable after defining it arbitrarily on the exceptional null set. It equals the section integral of $f$. Subtract the two finite outer integrals to obtain $$\\int_{X\\times Y}f\\,d(\\mu\\times\\nu)$$ $$=\\int_X\\left(\\int_Y f(x,y)\\,d\\nu\\right)d\\mu.$$ The outer integrand is absolutely integrable because its magnitude is at most $H(x)$."
      ],
      [
        "Reverse the order and handle complex functions",
        "Repeat the same reasoning with $X$ and $Y$ interchanged. This gives the other iterated integral and equality of all three. If $f=u+iv$ is complex, then $|u|,|v|\\le|f|$, so both real functions satisfy the absolute-integrability condition. Apply the real result to each and combine by complex linearity."
      ]
    ],
    "key": "Absolute integrability guarantees both the existence of almost all section integrals and the legitimacy of subtracting the two finite Tonelli identities."
  },
  "bounded": {
    "idea": "Bounded convergence is dominated convergence with the simplest possible envelope: a constant. The domain's finite measure makes that constant integrable.",
    "uses": [
      "Dominated convergence theorem"
    ],
    "steps": [
      [
        "Construct the common dominating function",
        "Let $g(x)=M$ for all $x\\in X$. It is measurable and $|f_n(x)|\\le g(x)$ almost everywhere. Since $\\mu(X)<\\infty$, $$\\int_X g\\,d\\mu=M\\mu(X)<\\infty.$$ Thus $g\\in L^1(X)$, exactly the domination hypothesis of DCT."
      ],
      [
        "Verify the other DCT hypothesis",
        "By assumption $f_n\\to f$ almost everywhere. Taking limits also yields $|f|\\le M$ almost everywhere, so the limit is integrable. All assumptions of dominated convergence are now verified."
      ],
      [
        "Apply DCT and conclude",
        "The stronger conclusion of DCT gives $$\\int_X|f_n-f|\\,d\\mu\\longrightarrow0.$$ Linearity and the integral triangle inequality imply $$\\left|\\int_X f_n\\,d\\mu-\\int_X f\\,d\\mu\\right|$$ $$\\le\\int_X|f_n-f|\\,d\\mu\\longrightarrow0.$$ This proves the desired interchange."
      ]
    ],
    "key": "There is no independent difficult proof here: bounded convergence is an immediate corollary of DCT. Finiteness of the domain is used exactly to integrate the constant."
  },
  "vitali": {
    "idea": "Separate bounded function values from large values. Convergence in measure handles the bounded part, while uniform integrability handles the tails.",
    "uses": [
      "Fatou’s lemma",
      "Borel–Cantelli lemma",
      "Triangle inequality in L¹"
    ],
    "steps": [
      [
        "Derive a uniform bound on the integrals",
        "For $K>0$ write $$\\int |f_n|\\,d\\mu=\\int_{\\{|f_n|\\le K\\}}|f_n|\\,d\\mu+\\int_{\\{|f_n|>K\\}}|f_n|\\,d\\mu.$$ By uniform integrability, choose $K$ so large that the second term is at most $1$ for all $n$. The first is at most $K\\mu(X)$. Therefore $$\\sup_n\\int|f_n|\\,d\\mu\\le K\\mu(X)+1<\\infty.$$ This is where finiteness of the space first matters."
      ],
      [
        "Prove integrability of the limit",
        "Convergence in measure allows us to select increasing indices $n_j$ such that $$\\mu(\\{|f_{n_j}-f|>2^{-j}\\})<2^{-j}.$$ The sum of these measures is finite. By the first Borel–Cantelli lemma, almost every point belongs to only finitely many of these exceptional sets. Hence $f_{n_j}\\to f$ almost everywhere. Apply Fatou to the absolute values: $$\\int |f|\\,d\\mu\\le\\liminf_j\\int|f_{n_j}|\\,d\\mu<\\infty.$$ Thus $f\\in L^1$. Only one almost-everywhere convergent subsequence is needed for this step."
      ],
      [
        "Truncate the functions at height K",
        "For real values put $T_K(t)=\\max(-K,\\min(K,t))$. For complex values take the radial projection onto the closed disk of radius $K$. In either case the map is nonexpansive: $|T_K(u)-T_K(v)|\\le|u-v|$ (the metric projection onto a closed convex set in Euclidean space). Consequently $T_K(f_n)\\to T_K(f)$ in measure. Their absolute difference $d_n$ is bounded by $2K$. For every $\\eta>0$, split the integral over $\\{d_n\\le\\eta\\}$ and its complement: $$\\int d_n\\,d\\mu\\le\\eta\\mu(X)+2K\\mu(\\{d_n>\\eta\\}).$$ For fixed $K,\\eta$, the second term tends to zero. Let $\\eta\\downarrow0$ to conclude $$\\|T_K(f_n)-T_K(f)\\|_1\\longrightarrow0.$$"
      ],
      [
        "Control the discarded tails",
        "The truncation satisfies $|t-T_K(t)|\\le|t|\\mathbf1_{\\{|t|>K\\}}$. Hence $$\\sup_n\\|f_n-T_K(f_n)\\|_1\\longrightarrow0$$ as $K\\to\\infty$, by uniform integrability. Also $\\|f-T_K(f)\\|_1\\to0$, because $f$ is integrable (apply DCT to $|f|\\mathbf1_{\\{|f|>K\\}}$)."
      ],
      [
        "Combine the estimates in the correct order",
        "Fix $\\varepsilon>0$. By Step 4 choose one $K$ making each of the two tail errors less than $\\varepsilon/3$, uniformly in $n$ for the first. With this $K$ fixed, Step 3 makes the truncated difference less than $\\varepsilon/3$ for all sufficiently large $n$. Now $$\\begin{aligned}\\|f_n-f\\|_1&\\le\\|f_n-T_K(f_n)\\|_1\\\\&+\\|T_K(f_n)-T_K(f)\\|_1\\\\&+\\|T_K(f)-f\\|_1<\\varepsilon.\\end{aligned}$$ Therefore $f_n\\to f$ in $L^1$. The convergence of integrals follows from $|\\int(f_n-f)\\,d\\mu|\\le\\|f_n-f\\|_1$."
      ]
    ],
    "key": "Choose the truncation height first, independently of n, then let n grow. Uniform integrability is precisely what allows this order of choices."
  }
};
