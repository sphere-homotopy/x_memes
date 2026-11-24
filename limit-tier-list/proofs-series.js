Object.assign(window.THEOREM_PROOFS, {
  "leibniz": {
    "idea": "A parameter derivative is a limit of difference quotients. The derivative bound supplies a common integrable bound for all those quotients.",
    "uses": [
      "Mean value estimate",
      "Dominated convergence theorem",
      "Sequential characterization of limits"
    ],
    "steps": [
      [
        "Establish that the parameter integral exists",
        "Work on the common full-measure set where differentiability and the bound hold. For fixed $x$, the real-variable mean value estimate gives $$|f(t,x)-f(t_0,x)|\\le |t-t_0|g(x).$$ For complex values, the same estimate follows by projecting the difference onto its own unit direction and applying the real mean value theorem to that real projection. Consequently $$|f(t,x)|\\le|f(t_0,x)|+|t-t_0|g(x).$$ The right side is integrable for each fixed $t$. Therefore $F(t)=\\int_X f(t,x)\\,d\\mu$ is well-defined throughout $I$."
      ],
      [
        "Write the difference quotient as an integral",
        "Fix $t\\in I$. Because $I$ is open, for sufficiently small nonzero $h$ both $t$ and $t+h$ belong to $I$. Set $$q_h(x)=\\frac{f(t+h,x)-f(t,x)}h.$$ For each fixed $h$, this is measurable and integrable by Step 1. Finite linearity gives $$\\frac{F(t+h)-F(t)}h=\\int_X q_h(x)\\,d\\mu.$$ We must justify the limit of this identity as $h\\to0$."
      ],
      [
        "Verify pointwise convergence and domination",
        "For almost every $x$, differentiability in $t$ implies $$q_h(x)\\to\\partial_t f(t,x).$$ The mean value estimate on the segment joining $t$ and $t+h$ gives $$|q_h(x)|\\le g(x).$$ This is the same integrable function for every sufficiently small $h$. The derivative is measurable up to a null set because it is the almost-everywhere limit of measurable quotients along a sequence $h_j\\to0$."
      ],
      [
        "Invoke dominated convergence for arbitrary sequences",
        "Let $(h_j)$ be any sequence of nonzero real increments tending to zero, with $t+h_j\\in I$. By DCT, $$\\lim_j\\int_X q_{h_j}\\,d\\mu=\\int_X\\partial_t f(t,x)\\,d\\mu.$$ The result is independent of the sequence. The sequential criterion for real-variable limits therefore gives $$F'(t)=\\lim_{h\\to0}\\frac{F(t+h)-F(t)}h$$ $$=\\int_X\\partial_t f(t,x)\\,d\\mu.$$ Since $t$ was arbitrary, the identity holds throughout $I$."
      ]
    ],
    "key": "The domination must control the difference quotients, not merely the original functions. The derivative bound and mean value estimate provide exactly this control."
  },
  "abel": {
    "idea": "Summation by parts rewrites the power series as a geometric weighted average of the ordinary partial sums. The weights escape every finite initial segment as r approaches one.",
    "uses": [
      "Finite summation by parts",
      "Geometric series",
      "Ordinary convergence of partial sums"
    ],
    "steps": [
      [
        "Define the partial sums and prove interior convergence",
        "Let $$s_n=\\sum_{k=0}^n a_k,\\qquad s_{-1}=0.$$ By hypothesis $s_n\\to s$, so $(s_n)$ is bounded and $a_n=s_n-s_{n-1}$ is bounded. For $0\\le r<1$, comparison with a geometric series gives absolute convergence of $\\sum a_nr^n$ and $\\sum s_nr^n$."
      ],
      [
        "Derive the finite summation-by-parts identity",
        "Substitute $a_n=s_n-s_{n-1}$ into the finite sum: $$\\begin{aligned}\\sum_{n=0}^N a_nr^n&=\\sum_{n=0}^N s_nr^n-\\sum_{n=1}^N s_{n-1}r^n\\\\&=\\sum_{n=0}^N s_nr^n-r\\sum_{n=0}^{N-1}s_nr^n\\\\&=(1-r)\\sum_{n=0}^{N-1}s_nr^n+s_Nr^N.\\end{aligned}$$ For fixed $r<1$, the last term tends to zero because $(s_N)$ is bounded. Letting $N\\to\\infty$ gives $$\\sum_{n=0}^\\infty a_nr^n=(1-r)\\sum_{n=0}^\\infty s_nr^n.$$"
      ],
      [
        "Subtract the ordinary sum",
        "The geometric series identity says $$(1-r)\\sum_{n=0}^\\infty r^n=1.$$ Thus the difference from the desired limit is $$\\sum_{n=0}^\\infty a_nr^n-s$$ $$=(1-r)\\sum_{n=0}^\\infty(s_n-s)r^n.$$ We now have a weighted sum of errors of the partial sums."
      ],
      [
        "Split the error into a finite head and an infinite tail",
        "Fix $\\varepsilon>0$. Since $s_n\\to s$, choose $N$ such that $|s_n-s|<\\varepsilon/2$ for all $n\\ge N$. The tail satisfies $$\\begin{aligned}(1-r)\\sum_{n=N}^\\infty|s_n-s|r^n&\\le\\frac{\\varepsilon}{2}(1-r)\\sum_{n=N}^\\infty r^n\\\\&=\\frac{\\varepsilon}{2}r^N\\le\\frac{\\varepsilon}{2}.\\end{aligned}$$ For the head, set $C_N=\\sum_{n=0}^{N-1}|s_n-s|$, a finite constant. Since $0\\le r^n\\le1$, its contribution is at most $(1-r)C_N$. For $r$ sufficiently close to one this is less than $\\varepsilon/2$."
      ],
      [
        "Combine the two bounds",
        "By the triangle inequality, for all such $r$, $$\\left|\\sum_{n=0}^\\infty a_nr^n-s\\right|<\\varepsilon.$$ Thus $$\\lim_{r\\uparrow1}\\sum_{n=0}^\\infty a_nr^n=s.$$ We did not assume absolute convergence of the boundary series; only convergence of its ordinary partial sums was used."
      ]
    ],
    "key": "Choose N using ordinary convergence, then choose r close to one using the finite head. Reversing that order would not give the required uniform control."
  },
  "dirichlet": {
    "idea": "Summation by parts transfers cancellation from the oscillating factors to differences of the decreasing weights.",
    "uses": [
      "Finite summation by parts",
      "Uniform Cauchy criterion"
    ],
    "steps": [
      [
        "Bound every partial tail of the oscillating sequence",
        "Let $A_k(x)=\\sum_{n=1}^k a_n(x)$, with $A_0=0$. By assumption there is $C\\ge0$ such that $|A_k(x)|\\le C$ for all $k,x$. For $k\\ge N$, put $$P_k(x)=\\sum_{n=N}^k a_n(x)=A_k(x)-A_{N-1}(x).$$ Hence $|P_k(x)|\\le2C$, uniformly in $N,k,x$. Set $P_{N-1}=0$."
      ],
      [
        "Derive the finite weighted-tail identity",
        "Since $a_n=P_n-P_{n-1}$, expanding and reindexing finite sums yields $$\\begin{aligned}\\sum_{n=N}^M a_nb_n&=\\sum_{n=N}^M P_nb_n-\\sum_{n=N}^M P_{n-1}b_n\\\\&=P_Mb_M+\\sum_{n=N}^{M-1}P_n(b_n-b_{n+1}).\\end{aligned}$$ All functions in this identity are evaluated at the same $x$. This is summation by parts, the discrete analogue of integration by parts."
      ],
      [
        "Use the monotonicity of the weights",
        "Since $b_n(x)$ decreases to zero, it is nonnegative and $b_n-b_{n+1}\\ge0$. Taking absolute values in Step 2, $$\\left|\\sum_{n=N}^M a_nb_n\\right|$$ $$\\le2C\\left(b_M+\\sum_{n=N}^{M-1}(b_n-b_{n+1})\\right).$$ The difference sum telescopes to $b_N-b_M$. Therefore $$\\left|\\sum_{n=N}^M a_n(x)b_n(x)\\right|\\le2C b_N(x).$$"
      ],
      [
        "Apply the uniform Cauchy criterion",
        "Take the supremum over $x\\in E$: $$\\sup_x\\left|\\sum_{n=N}^M a_nb_n\\right|\\le2C\\sup_x b_N(x).$$ The right side tends to zero because $b_N\\to0$ uniformly. Given $\\varepsilon>0$, one index $N_0$ makes this bound less than $\\varepsilon$ for every $M\\ge N\\ge N_0$. The uniform Cauchy criterion (completeness of the scalar field and passage to the pointwise tail limit) gives uniform convergence."
      ]
    ],
    "key": "Bounded partial sums measure cancellation; decreasing weights make their total variation telescope. Uniform decay of the weights makes the resulting tail bound independent of x."
  },
  "abel-test": {
    "idea": "Uniform convergence makes all sufficiently late unweighted partial tails small. Bounded monotone weights have uniformly bounded total variation, so they cannot amplify those small tails very much.",
    "uses": [
      "Finite summation by parts",
      "Uniform Cauchy criterion"
    ],
    "steps": [
      [
        "Extract a uniformly small unweighted tail",
        "Fix $\\varepsilon>0$. Let $B$ be a common bound for $|b_n(x)|$. By uniform convergence of $\\sum a_n$, there is $N_0$ such that for all $k\\ge N\\ge N_0$ and $x\\in E$, $$\\left|\\sum_{n=N}^k a_n(x)\\right|<\\frac{\\varepsilon}{3B+1}.$$ For the rest of the proof fix $N\\ge N_0$ and denote this partial tail by $P_k(x)$."
      ],
      [
        "Apply the finite summation-by-parts identity",
        "Writing $a_n=P_n-P_{n-1}$ and $P_{N-1}=0$, rearrange the finite sum to obtain $$\\sum_{n=N}^M a_nb_n=P_Mb_M$$ $$+\\sum_{n=N}^{M-1}P_n(b_n-b_{n+1}).$$ This identity is purely algebraic; it does not assume convergence of the weighted series."
      ],
      [
        "Bound the total variation of the weights",
        "For each fixed $x$, monotonicity (in either direction) gives $$\\sum_{n=N}^{M-1}|b_n(x)-b_{n+1}(x)|$$ $$=|b_N(x)-b_M(x)|\\le2B.$$ Also $|b_M(x)|\\le B$. This is why the direction of monotonicity may vary with $x$: the variation estimate is independent of the direction."
      ],
      [
        "Show that every weighted tail is small",
        "Using Steps 1–3 and the triangle inequality, $$\\left|\\sum_{n=N}^M a_n(x)b_n(x)\\right|$$ $$\\le\\frac{\\varepsilon}{3B+1}(B+2B)<\\varepsilon.$$ This holds for every $x$ and every $M\\ge N\\ge N_0$. Therefore the weighted series is uniformly Cauchy and converges uniformly. The argument also covers $B=0$, when every weighted term is zero."
      ]
    ],
    "key": "Unlike Dirichlet’s test, the weights need not tend to zero. Here uniform smallness already comes from the tails of the convergent unweighted series."
  },
  "power": {
    "idea": "Inside a convergence disk, a slightly larger radius supplies a geometric margin that absorbs the factor n introduced by differentiation.",
    "uses": [
      "Cauchy–Hadamard radius formula",
      "Weierstrass M-test",
      "Fundamental theorem along a line segment"
    ],
    "steps": [
      [
        "Choose two radii strictly inside the disk",
        "Translate the center to zero by writing $w=z-z_0$. Fix $0<r<\\rho<R$ (when $R=\\infty$, choose any finite $\\rho>r$). Since the series converges at $w=\\rho$, its terms $a_n\\rho^n$ tend to zero and are bounded. Thus some $C<\\infty$ satisfies $|a_n|\\rho^n\\le C$ for every $n$."
      ],
      [
        "Prove uniform convergence of both series",
        "For $|w|\\le r$, $$|a_nw^n|\\le C(r/\\rho)^n.$$ The numerical geometric majorant converges because $r/\\rho<1$. Hence the original series converges uniformly by the M-test. For the formally differentiated terms ($n\\ge1$), $$|na_nw^{n-1}|\\le\\frac C\\rho n(r/\\rho)^{n-1}.$$ The numerical series $\\sum_{n\\ge1}nq^{n-1}$ converges for $0<q<1$ by the ratio test. Hence the differentiated series also converges uniformly on the smaller disk. Denote its sum by $g(w)$; it is continuous by the uniform limit theorem."
      ],
      [
        "Use finite polynomial identities",
        "Let $P_N(w)=\\sum_{n=0}^N a_nw^n$. Fix $w$ strictly inside the disk and choose $r$ with $|w|<r<R$. For sufficiently small complex $h$, the whole segment from $w$ to $w+h$ lies in $|u|\\le r$. By the real-variable chain rule along the segment, $$P_N(w+h)-P_N(w)=h\\int_0^1 P_N'(w+th)\\,dt.$$ Divide by $h\\ne0$. Uniform convergence of $P_N'$ on that disk permits passage through the finite-interval integral; uniform convergence of $P_N$ gives the limit on the left. Therefore $$\\frac{f(w+h)-f(w)}h=\\int_0^1 g(w+th)\\,dt.$$"
      ],
      [
        "Take the complex derivative",
        "Continuity of $g$ at $w$ implies $\\sup_{0\\le t\\le1}|g(w+th)-g(w)|\\to0$ as complex $h\\to0$. Thus $$\\left|\\frac{f(w+h)-f(w)}h-g(w)\\right|$$ $$\\le\\sup_{0\\le t\\le1}|g(w+th)-g(w)|\\to0.$$ The limit is independent of the direction of $h$. This proves complex differentiability and $f'=g$. Translating back gives the asserted derivative formula."
      ],
      [
        "Verify the radius and path integration",
        "The Cauchy–Hadamard formula gives $1/R=\\limsup_n|a_n|^{1/n}$. Multiplication by $n$ does not change that upper limit because $n^{1/n}\\to1$. Therefore the series $\\sum_{n\\ge1}na_n w^n$ has radius $R$, and dividing by $w$ away from zero shows that $\\sum_{n\\ge1}na_n w^{n-1}$ has the same radius. Finally, a piecewise smooth path inside the disk is compact and lies in some smaller disk. If its length is $L$, $$\\left|\\int_\\gamma(f-P_N)\\,dz\\right|\\le L\\|f-P_N\\|_{\\infty,\\gamma}\\to0.$$ Thus path integration also commutes with summation."
      ]
    ],
    "key": "The argument uses uniform convergence on each smaller disk, not necessarily on the entire open disk. The strict inequality r < ρ < R is the source of the summable derivative bound."
  },
  "absolute-series": {
    "idea": "Once a finite initial set captures almost all of the absolute mass, every sufficiently late permuted partial sum contains it. The remaining error is bounded regardless of the permutation.",
    "uses": [
      "Absolute convergence implies convergence",
      "Tail estimate for absolutely convergent series"
    ],
    "steps": [
      [
        "Fix the original sum and an absolute tail",
        "Let $s=\\sum_{n=1}^\\infty a_n$, which exists by absolute convergence in $\\mathbb R$ or $\\mathbb C$. Given $\\varepsilon>0$, choose $N$ such that $$\\sum_{n>N}|a_n|<\\varepsilon.$$ This estimate controls the sum over any finite or infinite subset of indices larger than $N$."
      ],
      [
        "Find when the permutation has included the initial terms",
        "Because $\\pi$ is a bijection, each index $1,\\ldots,N$ has a unique preimage. Choose $$M_0=\\max_{1\\le n\\le N}\\pi^{-1}(n).$$ For every $M\\ge M_0$, the finite set $F_M=\\{\\pi(1),\\ldots,\\pi(M)\\}$ contains all of $\\{1,\\ldots,N\\}$."
      ],
      [
        "Bound what is missing",
        "The permuted partial sum is $t_M=\\sum_{n\\in F_M}a_n$. Subtract this finite set of terms from the original series. Since finite deletion of terms preserves convergence, $$s-t_M=\\sum_{n\\notin F_M}a_n,$$ where the remaining series is taken in its original increasing index order. All missing indices exceed $N$, so $$|s-t_M|\\le\\sum_{n\\notin F_M}|a_n|$$ $$\\le\\sum_{n>N}|a_n|<\\varepsilon.$$"
      ],
      [
        "Conclude independently of the permutation",
        "The estimate holds for every $M\\ge M_0$. Hence $t_M\\to s$, which by definition is $$\\sum_{n=1}^\\infty a_{\\pi(n)}=\\sum_{n=1}^\\infty a_n.$$ Because $\\pi$ was arbitrary, every rearrangement preserves the sum. The proof uses absolute convergence precisely to bound arbitrary subsets of a tail, something conditional convergence does not guarantee."
      ]
    ],
    "key": "The argument is about finite subsets of indices, not a particular order. This is the reason absolutely summable families can also be grouped and enumerated in different ways."
  },
  "cauchy-product": {
    "idea": "Rewrite triangular partial sums as a weighted sum of the other series’ partial sums. Absolute convergence of one factor allows dominated convergence on the index set.",
    "uses": [
      "Finite reindexing of double sums",
      "Dominated convergence for counting measure"
    ],
    "steps": [
      [
        "Choose the absolutely convergent factor",
        "By symmetry we may assume $\\sum_{k=0}^\\infty |a_k|<\\infty$. Define $$B_j=\\sum_{l=0}^j b_l\\quad(j\\ge0),$$ and set $B_j=0$ for $j<0$. The series $\\sum b_l$ converges to $B$, so $B_j\\to B$ and there is a constant $C$ with $|B_j|\\le C$ for all integer $j$."
      ],
      [
        "Rewrite each triangular partial sum",
        "Let $c_n=\\sum_{k=0}^n a_k b_{n-k}$ and $S_N=\\sum_{n=0}^N c_n$. Since these are finite sums, we may change their order: $$\\begin{aligned}S_N&=\\sum_{n=0}^N\\sum_{k=0}^n a_k b_{n-k}\\\\&=\\sum_{k=0}^N a_k\\sum_{n=k}^N b_{n-k}\\\\&=\\sum_{k=0}^N a_k B_{N-k}.\\end{aligned}$$ Our convention for negative indices gives the equivalent infinite expression $$S_N=\\sum_{k=0}^\\infty a_kB_{N-k},$$ with all terms beyond $k=N$ equal to zero."
      ],
      [
        "Verify pointwise convergence and a summable bound",
        "For each fixed $k$, $N-k\\to\\infty$ as $N\\to\\infty$, so $a_kB_{N-k}\\to a_kB$. Furthermore $$|a_kB_{N-k}|\\le C|a_k|$$ for all $N,k$. The majorant is summable by absolute convergence of the first factor. On the nonnegative integers equipped with counting measure, these are exactly the hypotheses of dominated convergence."
      ],
      [
        "Interchange the limit and the sum",
        "DCT now gives $$\\lim_{N\\to\\infty}S_N=\\sum_{k=0}^\\infty\\lim_{N\\to\\infty}a_kB_{N-k}$$ $$=\\sum_{k=0}^\\infty a_kB=AB.$$ Since $S_N$ are the partial sums of the Cauchy product, this proves its convergence and its asserted sum. If instead $\\sum b_n$ is absolutely convergent, interchange the roles of the two factors."
      ]
    ],
    "key": "No absolute convergence of the entire double series is assumed. Only one factor must supply a summable bound, while the other supplies bounded convergent partial sums."
  },
  "stokes": {
    "idea": "Uniform Cauchy estimates pass to the boundary limits of finite tails. After that, a finite-head/two-tail argument establishes the desired interchange.",
    "uses": [
      "Uniform Cauchy criterion",
      "Completeness of the scalar field",
      "Finite linearity of limits"
    ],
    "steps": [
      [
        "Name the sum and quantify its uniform convergence",
        "Let $E$ be the punctured neighborhood from the statement and put $$S(x)=\\sum_{n=1}^\\infty f_n(x),\\qquad x\\in E.$$ Fix $\\varepsilon>0$. Uniform convergence supplies $N_0$ such that for all $M\\ge N\\ge N_0$, $$\\sup_{x\\in E}\\left|\\sum_{n=N}^M f_n(x)\\right|<\\varepsilon/4.$$ We will use this estimate twice: first to prove convergence of the series of boundary values, then to control the original series near the boundary."
      ],
      [
        "Establish convergence of the series of limits",
        "For any fixed finite pair $M,N$, the limit of the finite sum as $x\\to a$ within $E$ is $\\sum_{n=N}^M\\ell_n$. Taking the limit in the tail bound gives $$\\left|\\sum_{n=N}^M\\ell_n\\right|\\le\\varepsilon/4.$$ Since the tolerance was arbitrary, the scalar Cauchy criterion shows that $L=\\sum_{n=1}^\\infty\\ell_n$ exists. Letting $M\\to\\infty$ in the same estimate bounds the infinite tail of this scalar series by $\\varepsilon/4$."
      ],
      [
        "Separate finite head from the two tails",
        "Fix $N\\ge N_0$. For every $x\\in E$, subtract the two series and split them at $N$: $$\\begin{aligned}|S(x)-L|&\\le\\left|\\sum_{n=1}^{N-1}(f_n(x)-\\ell_n)\\right|\\\\&+\\left|\\sum_{n=N}^\\infty f_n(x)\\right|\\\\&+\\left|\\sum_{n=N}^\\infty\\ell_n\\right|.\\end{aligned}$$ Taking $M\\to\\infty$ in the uniform tail estimate bounds the second term by $\\varepsilon/4$, uniformly in $x$. Step 2 bounds the third term by $\\varepsilon/4$."
      ],
      [
        "Pass the limit through the finite head",
        "The first term is a fixed finite sum of functions tending to zero at $a$. Thus there is a neighborhood of $a$ in which that term is less than $\\varepsilon/2$ for $x\\in E$. In that neighborhood $|S(x)-L|<\\varepsilon$. Therefore $$\\lim_{x\\to a,\\ x\\in E} S(x)=L=\\sum_{n=1}^\\infty\\ell_n.$$ The accumulation-point assumption ensures that this boundary limit is meaningful."
      ]
    ],
    "key": "The existence of all termwise limits is not enough. The same tail bound must work arbitrarily close to the boundary, before the limit is taken."
  },
  "riemann-lebesgue": {
    "idea": "Oscillatory exponentials cancel on every fixed bounded interval. Approximate any integrable function by finitely many such interval indicators, with a frequency-independent error estimate.",
    "uses": [
      "Density of interval step functions in L¹(ℝ)",
      "Integral triangle inequality"
    ],
    "steps": [
      [
        "Prove cancellation for a single interval",
        "For any finite interval $(a,b)$ and real $\\xi\\ne0$, direct integration gives $$\\int_a^b e^{-i\\xi x}\\,dx=\\frac{e^{-i\\xi a}-e^{-i\\xi b}}{i\\xi}.$$ Because both exponentials have modulus one, $$\\left|\\int_a^b e^{-i\\xi x}\\,dx\\right|\\le\\frac2{|\\xi|}\\to0$$ as $|\\xi|\\to\\infty$. No pointwise convergence of the exponential is needed."
      ],
      [
        "Extend the estimate to step functions",
        "For $s(x)=\\sum_{j=1}^k c_j\\mathbf1_{(a_j,b_j)}(x)$, finite linearity and Step 1 give $$|\\widehat s(\\xi)|\\le\\frac2{|\\xi|}\\sum_{j=1}^k |c_j|.$$ Hence $\\widehat s(\\xi)\\to0$ for every such step function."
      ],
      [
        "Approximate the given integrable function",
        "Fix $\\varepsilon>0$. Interval step functions are dense in $L^1(\\mathbb R)$: truncate to a bounded domain and bounded values, approximate by simple functions, then approximate their finite-measure level sets in measure by finite unions of bounded intervals using regularity of Lebesgue measure. Thus choose a step function $s$ with $$\\|f-s\\|_1<\\varepsilon/2.$$ It is important that this approximation is chosen independently of $\\xi$."
      ],
      [
        "Control the Fourier error uniformly in frequency",
        "Since $|e^{-i\\xi x}|=1$, $$\\begin{aligned}|\\widehat f(\\xi)-\\widehat s(\\xi)|&=\\left|\\int_{\\mathbb R}(f-s)e^{-i\\xi x}\\,dx\\right|\\\\&\\le\\int_{\\mathbb R}|f-s|\\,dx<\\varepsilon/2.\\end{aligned}$$ This estimate holds at every frequency."
      ],
      [
        "Combine approximation and cancellation",
        "For the fixed $s$, choose $R_0$ so that $|\\widehat s(\\xi)|<\\varepsilon/2$ whenever $|\\xi|>R_0$. Then $$|\\widehat f(\\xi)|\\le|\\widehat f(\\xi)-\\widehat s(\\xi)|+|\\widehat s(\\xi)|<\\varepsilon.$$ This proves the asserted limit."
      ]
    ],
    "key": "The lemma does not interchange a pointwise limit with integration: the oscillatory integrand generally has no pointwise limit. Instead, uniform approximation in the L¹ norm transfers cancellation."
  },
  "weak-port": {
    "idea": "Approximate discontinuous set indicators by continuous functions from one side. At sets whose boundary has zero limiting measure, upper and lower bounds meet.",
    "uses": [
      "Bounded convergence theorem",
      "Continuity of distance to a closed set",
      "Layer-cake formula (Tonelli)"
    ],
    "steps": [
      [
        "Weak convergence implies the closed-set inequality",
        "Assume $\\mu_n\\Rightarrow\\mu$. Let $F$ be a nonempty closed set and define $$g_k(x)=\\max(0,1-kd(x,F)).$$ The distance function is continuous and vanishes precisely on $F$. Thus $g_k$ is bounded continuous, $g_k\\ge\\mathbf1_F$, and $g_k\\downarrow\\mathbf1_F$. For fixed $k$, $$\\mu_n(F)\\le\\int g_k\\,d\\mu_n.$$ Weak convergence gives $$\\limsup_n\\mu_n(F)\\le\\int g_k\\,d\\mu.$$ Now let $k\\to\\infty$ by bounded convergence, since $\\mu$ is a probability measure. This gives $\\limsup_n\\mu_n(F)\\le\\mu(F)$. The empty set is immediate."
      ],
      [
        "Closed and open inequalities are equivalent",
        "For an open set $G$, its complement $F=X\\setminus G$ is closed. Since all measures have total mass one, $$\\mu_n(G)=1-\\mu_n(F).$$ Hence $$\\liminf_n\\mu_n(G)=1-\\limsup_n\\mu_n(F)$$ $$\\ge1-\\mu(F)=\\mu(G).$$ Conversely, applying the open inequality to the complement of a closed set yields the closed inequality by the same calculation."
      ],
      [
        "Obtain convergence on boundary-null sets",
        "Let $A$ be Borel with $\\mu(\\partial A)=0$. We have $A^\\circ\\subseteq A\\subseteq\\overline A$. The difference between closure and interior is the boundary, so $\\mu(A^\\circ)=\\mu(A)=\\mu(\\overline A)$. Apply the open inequality to $A^\\circ$ and the closed inequality to $\\overline A$: $$\\mu(A^\\circ)\\le\\liminf_n\\mu_n(A)$$ $$\\le\\limsup_n\\mu_n(A)\\le\\mu(\\overline A).$$ Both endpoints equal $\\mu(A)$, proving $\\mu_n(A)\\to\\mu(A)$."
      ],
      [
        "Reduce continuous test functions to level sets",
        "Conversely, assume convergence on every Borel $\\mu$-continuity set. Let $h$ be bounded continuous real-valued. Shifting by a constant reduces to $0\\le h\\le M$, since the measures all integrate constants equally. For $0<t<M$ let $A_t=\\{x:h(x)>t\\}$. Continuity gives $\\partial A_t\\subseteq\\{h=t\\}$. The level sets $\\{h=t\\}$ are pairwise disjoint; only countably many can have positive $\\mu$-measure (for each integer $k$, at most $k$ can have measure at least $1/k$). Hence for almost every real $t$, $\\mu(\\partial A_t)=0$, and $\\mu_n(A_t)\\to\\mu(A_t)$."
      ],
      [
        "Use the layer-cake formula to recover weak convergence",
        "For each point $x$, $$h(x)=\\int_0^M\\mathbf1_{\\{h(x)>t\\}}\\,dt.$$ Tonelli gives $$\\int h\\,d\\mu_n=\\int_0^M\\mu_n(A_t)\\,dt.$$ The functions of $t$ on the right are measurable (they are decreasing), bounded by one, and converge almost everywhere to $\\mu(A_t)$. Bounded convergence on $[0,M]$ therefore gives $$\\lim_n\\int h\\,d\\mu_n=\\int_0^M\\mu(A_t)\\,dt$$ $$=\\int h\\,d\\mu.$$ This is weak convergence. Together the steps establish equivalence of all four conditions."
      ]
    ],
    "key": "The order matters: first take n to infinity for a fixed continuous approximation, then refine the approximation. Zero boundary mass is precisely what eliminates the gap between the open and closed bounds."
  }
});
