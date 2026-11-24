Object.assign(window.THEOREM_PROOFS, {
  "uniform-integral": {
    "idea": "Control the oscillation of the limit using a nearby integrable function, then bound the integral of their difference.",
    "uses": [
      "Darboux criterion for Riemann integrability",
      "Integral comparison"
    ],
    "steps": [
      [
        "First show the limit is bounded",
        "Let $a<b$ (the case $a=b$ is immediate). Uniform convergence gives an index $n$ with $\\|f-f_n\\|_\\infty<1$. Since $f_n$ is Riemann integrable, it is bounded. Thus $|f(x)|\\le |f_n(x)|+1$ on the interval, so $f$ is bounded."
      ],
      [
        "Compare upper and lower sums",
        "Fix $\\varepsilon>0$. Choose $n$ such that $\\|f-f_n\\|_\\infty<\\varepsilon/[4(b-a)]$. Set $\\delta=\\|f-f_n\\|_\\infty$. On every subinterval $J$, $$\\sup_J f\\le\\sup_J f_n+\\delta,$$ $$\\inf_J f\\ge\\inf_J f_n-\\delta.$$ Subtracting, the oscillation of $f$ on $J$ exceeds that of $f_n$ by at most $2\\delta$. Multiply by the lengths and sum over a partition $P$: $$U(f,P)-L(f,P)$$ $$\\le U(f_n,P)-L(f_n,P)+2\\delta(b-a).$$"
      ],
      [
        "Use the integrability of the approximant",
        "Since $f_n$ is Riemann integrable, choose a partition $P$ for which $U(f_n,P)-L(f_n,P)<\\varepsilon/2$. The previous inequality now gives $U(f,P)-L(f,P)<\\varepsilon$. As $\\varepsilon$ was arbitrary, the Darboux criterion proves $f$ is Riemann integrable. This part is needed before we can integrate the limit."
      ],
      [
        "Bound the actual error",
        "Linearity and comparison for Riemann integrals now give $$\\left|\\int_a^b f_n-\\int_a^b f\\right|$$ $$\\le\\int_a^b|f_n-f|\\,dx$$ $$\\le(b-a)\\|f_n-f\\|_\\infty.$$ The last expression tends to zero by uniform convergence. Thus the limit commutes with integration."
      ]
    ],
    "key": "The finite length of the interval turns a uniform bound on function values into an integral bound; the Darboux argument also establishes that the limit is integrable."
  },
  "uniform-cont": {
    "idea": "Choose one approximating function that is accurate at every point, then use continuity of that fixed function.",
    "uses": [
      "Triangle inequality",
      "Definition of uniform convergence"
    ],
    "steps": [
      [
        "Choose the point and tolerance",
        "Fix any $x_0\\in X$ and any $\\varepsilon>0$. To show continuity, we need a neighborhood $U$ of $x_0$ with $d(f(x),f(x_0))<\\varepsilon$ for every $x\\in U$. We do not assume that $X$ has a metric."
      ],
      [
        "Freeze a uniformly good approximant",
        "Uniform convergence supplies one $N$ such that $$d(f_N(x),f(x))<\\frac{\\varepsilon}{3}$$ for every $x\\in X$. In particular this holds at $x_0$ and at every point of the neighborhood we will choose. Pointwise convergence would not guarantee the same index works at all those points."
      ],
      [
        "Use continuity of the fixed function",
        "Since $f_N$ is continuous at $x_0$, the inverse image of the open ball of radius $\\varepsilon/3$ centered at $f_N(x_0)$ is an open neighborhood $U$ of $x_0$. Thus $$d(f_N(x),f_N(x_0))<\\frac{\\varepsilon}{3}$$ for every $x\\in U$."
      ],
      [
        "Join the three distances",
        "For any $x\\in U$, the triangle inequality yields $$\\begin{aligned}d(f(x),f(x_0))&\\le d(f(x),f_N(x))\\\\&+d(f_N(x),f_N(x_0))\\\\&+d(f_N(x_0),f(x_0))\\\\&<\\varepsilon/3+\\varepsilon/3+\\varepsilon/3\\\\&=\\varepsilon.\\end{aligned}$$ Hence $f$ is continuous at $x_0$. Because $x_0$ was arbitrary, $f$ is continuous everywhere."
      ]
    ],
    "key": "The order of choices matters: choose the index uniformly first, then a neighborhood using continuity. This is the exact mechanism behind the interchange of the two limits."
  },
  "uniform-derivative": {
    "idea": "Reconstruct the functions from their derivatives and a single initial value; the fundamental theorem of calculus then identifies the derivative of the limit.",
    "uses": [
      "Uniform limit of continuous functions",
      "Fundamental theorem of calculus"
    ],
    "steps": [
      [
        "Identify the data that converge",
        "Let $c=\\lim_n f_n(x_0)$. By hypothesis $\\|f_n'-g\\|_\\infty\\to0$. Each $f_n'$ is continuous, so the uniform limit theorem implies that $g$ is continuous. In particular $g$ is integrable on every subinterval of $[a,b]$."
      ],
      [
        "Reconstruct the candidate limit",
        "For each $n$, the fundamental theorem of calculus gives $$f_n(x)=f_n(x_0)+\\int_{x_0}^x f_n'(t)\\,dt.$$ Define $$f(x)=c+\\int_{x_0}^x g(t)\\,dt.$$ This is the natural candidate, but we must still prove that $f_n$ converges to it and that its derivative is the limit of the derivatives."
      ],
      [
        "Prove uniform convergence of the functions",
        "Subtract the two integral identities. For every $x\\in[a,b]$, $$\\begin{aligned}|f_n(x)-f(x)|&\\le |f_n(x_0)-c|\\\\&+\\left|\\int_{x_0}^x(f_n'-g)\\,dt\\right|\\\\&\\le |f_n(x_0)-c|\\\\&+(b-a)\\|f_n'-g\\|_\\infty.\\end{aligned}$$ The estimate also holds when $x<x_0$, by reversing integration limits. The right side is independent of $x$ and tends to zero. Taking the supremum proves $f_n\\to f$ uniformly."
      ],
      [
        "Differentiate the limit",
        "Since $g$ is continuous, the fundamental theorem of calculus applied to the definition of $f$ gives $$f'(x)=g(x)$$ in the interior and the corresponding one-sided derivatives at the endpoints. Thus $f\\in C^1([a,b])$ and $$\\frac{d}{dx}\\lim_n f_n(x)=\\lim_n f_n'(x).$$"
      ]
    ],
    "key": "The value at one point controls additive constants. Uniform convergence of derivatives controls every integral error simultaneously. Neither assumption can simply be omitted."
  },
  "m-test": {
    "idea": "A single convergent numerical series bounds all function-series tails, everywhere on the domain.",
    "uses": [
      "Comparison test",
      "Completeness of ℝ or ℂ",
      "Cauchy criterion"
    ],
    "steps": [
      [
        "Construct the pointwise sum",
        "For each fixed $x\\in E$, the hypothesis gives $|f_n(x)|\\le M_n$. Since $\\sum_{n=1}^\\infty M_n<\\infty$, comparison shows $\\sum_{n=1}^\\infty |f_n(x)|<\\infty$. Absolute convergence in the complete scalar field implies that $$S(x)=\\sum_{n=1}^\\infty f_n(x)$$ exists at every point of $E$."
      ],
      [
        "Bound a finite tail independently of x",
        "Let $S_N(x)=\\sum_{n=1}^N f_n(x)$. If $m>N$, the triangle inequality gives $$|S_m(x)-S_N(x)|$$ $$\\le\\sum_{n=N+1}^m|f_n(x)|$$ $$\\le\\sum_{n=N+1}^m M_n.$$ This last bound no longer contains $x$."
      ],
      [
        "Pass to the infinite tail",
        "For fixed $x$, let $m\\to\\infty$ in the previous inequality. Since $S_m(x)\\to S(x)$ and the numerical majorant series converges, $$|S(x)-S_N(x)|\\le\\sum_{n>N}M_n.$$ Taking the supremum over all $x\\in E$ preserves the same bound: $$\\|S-S_N\\|_\\infty\\le\\sum_{n>N}M_n.$$"
      ],
      [
        "Obtain a single convergence index",
        "Given $\\varepsilon>0$, choose $N_0$ such that $\\sum_{n>N_0}M_n<\\varepsilon$. Then for every $N\\ge N_0$ and every $x\\in E$, $|S(x)-S_N(x)|<\\varepsilon$. This is uniform convergence. The identical estimate for the series of absolute values shows that it converges uniformly too."
      ]
    ],
    "key": "Convergence of the numerical majorant is sufficient, not necessary. It is the uniform tail estimate, rather than pointwise comparison alone, that is useful for subsequent interchanges."
  },
  "moore": {
    "idea": "Use one sufficiently late row to prove that the column-limit sequence is Cauchy; then show every sufficiently late entry is close to the same limit.",
    "uses": [
      "Cauchy criterion in ℝ or ℂ",
      "Triangle inequality"
    ],
    "steps": [
      [
        "Translate uniformity into a quantified estimate",
        "Given $\\eta>0$, there exists $M$ such that $$|a_{mn}-b_n|<\\eta$$ for every $m\\ge M$ and every $n$. The index $M$ must work for all columns. This is stronger than having a separate convergence index for each $n$."
      ],
      [
        "Show that the column limits form a Cauchy sequence",
        "Fix $\\varepsilon>0$ and use Step 1 with $\\eta=\\varepsilon/3$. Fix one row $m=M$. By assumption $a_{Mn}$ converges as $n\\to\\infty$, so there exists $N$ such that $|a_{Mn}-a_{Mk}|<\\varepsilon/3$ for all $n,k\\ge N$. Hence $$\\begin{aligned}|b_n-b_k|&\\le|b_n-a_{Mn}|\\\\&+|a_{Mn}-a_{Mk}|\\\\&+|a_{Mk}-b_k|<\\varepsilon.\\end{aligned}$$ Thus $(b_n)$ is Cauchy. Completeness gives a scalar $L=\\lim_n b_n$."
      ],
      [
        "Prove convergence of the row limits",
        "Fix $\\varepsilon>0$ and choose $M$ in Step 1 with $\\eta=\\varepsilon/2$. For any $m\\ge M$, let $n\\to\\infty$ in $|a_{mn}-b_n|<\\varepsilon/2$. Both scalar sequences converge, to $c_m$ and $L$, respectively. Continuity of the absolute value gives $$|c_m-L|\\le\\varepsilon/2<\\varepsilon.$$ Hence $c_m\\to L$ as $m\\to\\infty$."
      ],
      [
        "Prove the joint limit",
        "Choose $M$ such that $|a_{mn}-b_n|<\\varepsilon/2$ for all $m\\ge M$ and all $n$. Choose $N$ such that $|b_n-L|<\\varepsilon/2$ whenever $n\\ge N$. Then for all $m\\ge M,n\\ge N$, $$|a_{mn}-L|\\le|a_{mn}-b_n|+|b_n-L|<\\varepsilon.$$ This is the definition of the joint limit. Both iterated limits and the joint limit therefore equal $L$."
      ]
    ],
    "key": "Uniformity lets us select a row before choosing how far along the columns to go. The joint limit controls arbitrary paths to infinity, not merely the two iterated limits."
  },
  "dini": {
    "idea": "For each error tolerance, build an increasing family of open sets where the approximation is already good. Compactness turns pointwise eventual coverage into simultaneous coverage.",
    "uses": [
      "Continuity of absolute error",
      "Open-cover definition of compactness"
    ],
    "steps": [
      [
        "Turn the convergence into decreasing errors",
        "Let $e_n(x)=|f_n(x)-f(x)|$. Since both functions are continuous, $e_n$ is continuous. For each $x$, monotone convergence to $f(x)$ implies $$e_{n+1}(x)\\le e_n(x),\\qquad e_n(x)\\to0.$$ This remains true whether the original functions increase or decrease at that point."
      ],
      [
        "Define where a given accuracy has been reached",
        "Fix $\\varepsilon>0$. Set $$U_n=\\{x\\in X:e_n(x)<\\varepsilon/2\\}.$$ Each $U_n$ is open as the inverse image of an open interval under the continuous map $e_n$. The decreasing errors imply $U_n\\subseteq U_{n+1}$. Since $e_n(x)\\to0$ at every point, for every $x\\in X$ some $U_n$ contains $x$. Therefore $$X=\\bigcup_{n=1}^\\infty U_n.$$"
      ],
      [
        "Invoke compactness exactly here",
        "The sets $U_n$ form an open cover of the compact space $X$. By compactness, there are finitely many indices $n_1,\\ldots,n_k$ whose sets already cover $X$. Let $N=\\max(n_1,\\ldots,n_k)$. Because the sets are nested, $$X=\\bigcup_{j=1}^k U_{n_j}=U_N.$$ This is the crucial improvement from a point-dependent index to one common index."
      ],
      [
        "Convert the cover back into uniform convergence",
        "Since $U_N=X$, every $x$ satisfies $e_N(x)<\\varepsilon/2$. Monotonicity gives the same bound for every $n\\ge N$. Thus $$\\sup_{x\\in X}|f_n(x)-f(x)|$$ $$\\le\\varepsilon/2<\\varepsilon,\\qquad n\\ge N.$$ This proves $\\|f_n-f\\|_\\infty\\to0$."
      ]
    ],
    "key": "Continuity makes the good sets open, monotonicity makes them nested, and compactness yields one index for the whole space. Each hypothesis has a distinct role."
  },
  "uniform-expect": {
    "idea": "Boundedness is a quantitative continuity estimate. Apply it to the difference between each approximant and its limit.",
    "uses": [
      "Definition of operator norm",
      "Linearity",
      "Norm convergence"
    ],
    "steps": [
      [
        "Translate boundedness into an inequality",
        "A bounded linear map $T:X\\to Y$ has a finite constant $C\\ge0$ satisfying $$\\|T(v)\\|_Y\\le C\\|v\\|_X$$ for every $v\\in X$. One may take $C=\\|T\\|$, the operator norm. The estimate holds for all vectors, including differences of approximants."
      ],
      [
        "Apply the estimate to a convergent sequence",
        "Suppose $x_n\\to x$ in norm. By linearity, $T(x_n)-T(x)=T(x_n-x)$. Hence $$\\begin{aligned}\\|T(x_n)-T(x)\\|_Y&=\\|T(x_n-x)\\|_Y\\\\&\\le C\\|x_n-x\\|_X\\to0.\\end{aligned}$$ This proves $T(x_n)\\to T(x)$ in the norm of $Y$. If desired, for any $\\varepsilon>0$ choose $n$ so that $\\|x_n-x\\|_X<\\varepsilon/(C+1)$."
      ],
      [
        "Reduce the infinite series to partial sums",
        "Suppose $\\sum_{n=1}^\\infty x_n$ converges in $X$ to $s$. Let $s_N=\\sum_{n=1}^N x_n$. Finite linearity gives $$T(s_N)=\\sum_{n=1}^N T(x_n).$$ No assertion about an infinite sum has been used yet."
      ],
      [
        "Pass to the limit",
        "Since $s_N\\to s$ in $X$, Step 2 gives $T(s_N)\\to T(s)$ in $Y$. But the left-hand sequence consists exactly of the partial sums of $\\sum T(x_n)$. Therefore that series converges and $$T\\left(\\sum_{n=1}^\\infty x_n\\right)=\\sum_{n=1}^\\infty T(x_n).$$ Completeness of either space is not required here: convergence of the original series in $X$ is assumed, and the target limit is explicitly $T(s)$."
      ]
    ],
    "key": "The theorem is about the chosen norm topology. An operator may be bounded in one norm and unbounded in another."
  },
  "arzela": {
    "idea": "Extract convergence on a countable dense set first. Equicontinuity and compactness turn that convergence into uniform convergence.",
    "uses": [
      "Bolzano–Weierstrass theorem",
      "Diagonal subsequence argument",
      "Compactness and completeness of C(X)"
    ],
    "steps": [
      [
        "Obtain a countable dense set",
        "Assume the family is equicontinuous and pointwise bounded. Compactness of $X$ implies that for every positive integer $k$, finitely many balls of radius $1/k$ cover $X$. The union of their finite sets of centers is countable and dense. Enumerate it as $D=\\{x_1,x_2,\\ldots\\}$ (repeat points if necessary)."
      ],
      [
        "Extract a diagonal subsequence",
        "Take an arbitrary sequence $(f_n)$ in the family. The values $(f_n(x_1))$ are bounded, so Bolzano–Weierstrass provides a subsequence converging at $x_1$. From that subsequence choose a further one converging at $x_2$, and continue. Denote the nested subsequences by $(f^{(j)}_k)_k$. Choose the diagonal $g_j=f^{(j)}_j$. For each fixed $i$, all diagonal terms with $j\\ge i$ belong to the $i$-th subsequence in increasing index order. Thus $g_j(x_i)$ converges for every $i$."
      ],
      [
        "Get a common scale of continuity",
        "Fix $\\varepsilon>0$. Equicontinuity at every $x$ supplies a neighborhood of $x$ on which every member changes by less than $\\varepsilon/6$ from its value at $x$. By compactness, choose finitely many such neighborhoods covering $X$. The Lebesgue number lemma gives $\\delta>0$ such that any two points at distance less than $\\delta$ lie together in one of these neighborhoods. By the triangle inequality, $$d(x,y)<\\delta\\implies |g_j(x)-g_j(y)|<\\varepsilon/3$$ for every $j$."
      ],
      [
        "Upgrade convergence at finitely many points",
        "Choose a finite $\\delta$-net of points from $D$, possible by compactness and density. At every net point, $(g_j)$ converges, so there is a common $N$ such that for all $m,n\\ge N$ the values differ there by less than $\\varepsilon/3$. For arbitrary $x$, choose a net point $x_i$ with $d(x,x_i)<\\delta$. Then $$\\begin{aligned}|g_m(x)-g_n(x)|&\\le |g_m(x)-g_m(x_i)|\\\\&+|g_m(x_i)-g_n(x_i)|\\\\&+|g_n(x_i)-g_n(x)|<\\varepsilon.\\end{aligned}$$ The same $N$ works everywhere. Taking the supremum (or using a smaller tolerance) shows the sequence is uniformly Cauchy."
      ],
      [
        "Conclude relative compactness",
        "Completeness of $\\mathbb R$ gives a pointwise limit $g(x)$; taking the limit in the uniform Cauchy estimate gives uniform convergence. The uniform limit theorem gives $g\\in C(X,\\mathbb R)$. We have proved that every sequence in the family has a convergent subsequence in $C(X)$. In a metric space this is equivalent to relative compactness (a sequence in the closure can be approximated by points of the family with errors tending to zero)."
      ],
      [
        "Prove the converse",
        "Suppose the closure is compact in the supremum norm. For any $\\varepsilon>0$ choose a finite $\\varepsilon/3$-net $h_1,\\ldots,h_k$ of continuous functions in that closure. Each is uniformly continuous on compact $X$, so one $\\delta>0$ ensures $|h_i(x)-h_i(y)|<\\varepsilon/3$ for all $i$ whenever $d(x,y)<\\delta$. For any $f$ in the family choose $h_i$ with $\\|f-h_i\\|_\\infty<\\varepsilon/3$. The three-term triangle inequality gives $|f(x)-f(y)|<\\varepsilon$, establishing equicontinuity. Taking a finite net of radius $1$ also gives $|f(x)|\\le 1+\\max_i|h_i(x)|$, proving pointwise boundedness."
      ]
    ],
    "key": "The dense-set diagonal argument alone gives only convergence at countably many points. Equicontinuity and a finite net supply the crucial uniform estimate."
  }
});
