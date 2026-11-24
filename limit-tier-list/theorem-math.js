// Typeset mathematical content: operation, statement, proof, example.
// $...$ denotes inline TeX; $$...$$ denotes a separate display equation.
// The original catalogue remains a readable fallback for offline/CDN failures.
window.THEOREM_MATH = {
  "mct": [
    "$\\lim\\int\\leftrightarrow\\int\\lim$",
    "Let $(X,\\mathcal A,\\mu)$ be a measure space and let $f_n:X\\to[0,\\infty]$ be measurable. If $f_n\\uparrow f$ almost everywhere, then $$\\lim_{n\\to\\infty}\\int_X f_n\\,d\\mu=\\int_X f\\,d\\mu,$$ allowing $+\\infty$.",
    "For a nonnegative simple function $s\\le f$ and $0<c<1$, the sets $E_n=\\{f_n\\ge cs\\}$ increase to cover $\\{s>0\\}$ up to null sets. Hence $$\\lim_n\\int_X f_n\\,d\\mu\\ge c\\int_X s\\,d\\mu.$$ Let $c\\uparrow1$ and take the supremum over $s$. The reverse inequality follows from monotonicity.",
    "On $\\mathbb R$ take $f_n=\\mathbf1_{[0,n]}$. Then $f_n\\uparrow\\mathbf1_{[0,\\infty)}$ and $$\\int_{\\mathbb R}f_n\\,dx=n\\longrightarrow\\infty.$$"
  ],
  "dct": [
    "$\\lim\\int\\leftrightarrow\\int\\lim$",
    "Let $f_n$ be measurable real or complex functions on a measure space. Suppose $f_n\\to f$ almost everywhere and $|f_n|\\le g$ almost everywhere for one nonnegative $g\\in L^1$. Then $f\\in L^1$ (up to a null set), and $$\\lim_{n\\to\\infty}\\int|f_n-f|\\,d\\mu=0,$$ $$\\lim_{n\\to\\infty}\\int f_n\\,d\\mu=\\int f\\,d\\mu.$$",
    "Since $|f|\\le g$ almost everywhere, apply Fatou to the nonnegative functions $2g-|f_n-f|$. This gives $$\\limsup_n\\int |f_n-f|\\,d\\mu\\le 0.$$ The triangle inequality for integrals gives the second conclusion.",
    "On $[0,1]$, take $f_n(x)=x^n$. The functions tend to zero almost everywhere and are dominated by $1$. $$\\int_0^1 x^n\\,dx=\\frac1{n+1}\\longrightarrow0.$$"
  ],
  "fatou": [
    "$\\liminf\\int\\ge\\int\\liminf$",
    "For any sequence of nonnegative measurable functions $f_n$ on a measure space, $$\\int_X\\liminf_{n\\to\\infty} f_n\\,d\\mu$$ $$\\le\\liminf_{n\\to\\infty}\\int_X f_n\\,d\\mu.$$ Both sides may be infinite.",
    "Set $g_n=\\inf_{k\\ge n} f_k$. Then $g_n\\uparrow\\liminf_n f_n$. By monotone convergence, $$\\int\\liminf_n f_n\\,d\\mu=\\lim_n\\int g_n\\,d\\mu.$$ Since $\\int g_n\\,d\\mu\\le\\inf_{k\\ge n}\\int f_k\\,d\\mu$, the inequality follows.",
    "On $(0,1)$, take $f_n=n\\mathbf1_{(0,1/n)}$. Then $f_n(x)\\to0$ at each point but $$\\int_0^1 f_n(x)\\,dx=1.$$ Thus Fatou's inequality can be strict."
  ],
  "fubini": [
    "$\\iint\\leftrightarrow\\iint$",
    "Let $(X,\\mu)$ and $(Y,\\nu)$ be $\\sigma$-finite measure spaces and let $f$ be product-measurable with $$\\int_{X\\times Y}|f|\\,d(\\mu\\times\\nu)<\\infty.$$ Almost all sections are integrable, and the following three integrals agree: $$\\int_{X\\times Y} f\\,d(\\mu\\times\\nu),$$ $$\\int_X\\left(\\int_Y f(x,y)\\,d\\nu\\right)d\\mu,$$ $$\\int_Y\\left(\\int_X f(x,y)\\,d\\mu\\right)d\\nu.$$",
    "Apply Tonelli to $f^+$ and $f^-$ (and to real and imaginary parts for complex $f$). Absolute integrability makes the relevant integrals finite and the differences well-defined.",
    "For $f(x,y)=xy$ on $[0,1]^2$, $$\\int_0^1\\!\\int_0^1xy\\,dx\\,dy=\\frac14.$$ Reversing the integration order gives the same result."
  ],
  "tonelli": [
    "$\\iint\\leftrightarrow\\iint$",
    "Let $(X,\\mu)$ and $(Y,\\nu)$ be $\\sigma$-finite measure spaces. For every nonnegative product-measurable $f$, the following integrals agree, allowing $+\\infty$: $$\\int_{X\\times Y} f\\,d(\\mu\\times\\nu),$$ $$\\int_X\\left(\\int_Y f(x,y)\\,d\\nu\\right)d\\mu,$$ $$\\int_Y\\left(\\int_X f(x,y)\\,d\\mu\\right)d\\nu.$$",
    "Verify the identity on measurable rectangles. Extend to measurable sets by the monotone class theorem, localizing to finite-measure rectangles. Extend to simple functions by linearity and to arbitrary nonnegative functions by monotone convergence.",
    "For measurable $f_n\\ge0$, counting measure on $\\mathbb N$ gives $$\\int_X\\sum_{n=1}^{\\infty} f_n\\,d\\mu$$ $$=\\sum_{n=1}^{\\infty}\\int_X f_n\\,d\\mu.$$"
  ],
  "uniform-integral": [
    "$\\lim\\int\\leftrightarrow\\int\\lim$",
    "If Riemann-integrable functions $f_n:[a,b]\\to\\mathbb R$ converge uniformly to $f$, then $f$ is Riemann integrable and $$\\lim_{n\\to\\infty}\\int_a^b f_n(x)\\,dx$$ $$=\\int_a^b f(x)\\,dx.$$",
    "Uniform approximation preserves Riemann integrability: the upper-minus-lower sum of $f$ is bounded by that of $f_n$ plus $2(b-a)\\|f_n-f\\|_\\infty$. Also $$\\left|\\int_a^b(f_n-f)\\,dx\\right|$$ $$\\le(b-a)\\|f_n-f\\|_\\infty\\to0.$$",
    "The series $\\sum_{n=0}^{\\infty}x^n/2^n$ converges uniformly on $[0,1]$, so it may be integrated term by term. $$\\int_0^1\\sum_{n=0}^\\infty\\frac{x^n}{2^n}\\,dx$$ $$=\\sum_{n=0}^\\infty\\frac1{2^n(n+1)}.$$"
  ],
  "uniform-cont": [
    "$\\lim_n\\lim_x\\leftrightarrow\\lim_x\\lim_n$",
    "Let $X$ be a topological space and $(Y,d)$ a metric space. If continuous functions $f_n:X\\to Y$ converge uniformly to $f:X\\to Y$, then $f$ is continuous.",
    "Fix $x_0$ and $\\varepsilon>0$. Choose $n$ with $d(f_n(x),f(x))<\\varepsilon/3$ for all $x$. By continuity of $f_n$, there is a neighborhood of $x_0$ on which $d(f_n(x),f_n(x_0))<\\varepsilon/3$. The triangle inequality gives $d(f(x),f(x_0))<\\varepsilon$.",
    "On $[0,1]$, the functions $x^n$ have the pointwise limit $$f(x)=\\begin{cases}0,&0\\le x<1,\\\\1,&x=1.\\end{cases}$$ The limit is discontinuous, so convergence is not uniform."
  ],
  "uniform-derivative": [
    "$\\lim\\frac{d}{dx}\\leftrightarrow\\frac{d}{dx}\\lim$",
    "Suppose $f_n\\in C^1([a,b])$, the sequence $f_n(x_0)$ converges at one point $x_0\\in[a,b]$, and $f_n'\\to g$ uniformly. Then $f_n\\to f$ uniformly for some $f\\in C^1([a,b])$, and $$f'(x)=g(x)=\\lim_{n\\to\\infty}f_n'(x).$$ Derivatives at endpoints are one-sided.",
    "By the fundamental theorem of calculus, $$f_n(x)=f_n(x_0)+\\int_{x_0}^{x}f_n'(t)\\,dt.$$ Uniform convergence of the derivatives implies uniform convergence of the integrals in $x$. Thus $$f(x)=\\lim_n f_n(x_0)+\\int_{x_0}^xg(t)\\,dt.$$ Since $g$ is continuous, the fundamental theorem gives $f'=g$.",
    "Uniform convergence of functions alone does not suffice: $$f_n(x)=\\frac{\\sin(nx)}n\\longrightarrow0,$$ but $f_n'(x)=\\cos(nx)$ does not converge to zero even at $x=0$."
  ],
  "m-test": [
    "$\\sum\\ \\Rightarrow\\ \\text{uniform convergence}$",
    "Let $f_n:E\\to\\mathbb R$ or $\\mathbb C$. If $|f_n(x)|\\le M_n$ for every $x\\in E$, where $M_n\\ge0$ and $$\\sum_{n=1}^{\\infty}M_n<\\infty,$$ then $\\sum_{n=1}^\\infty f_n$ converges absolutely and uniformly on $E$.",
    "For $m>n$, $$\\sup_{x\\in E}\\left|\\sum_{k=n+1}^{m}f_k(x)\\right|$$ $$\\le\\sum_{k=n+1}^{m}M_k\\longrightarrow0.$$ Apply the uniform Cauchy criterion. Absolute convergence follows by comparison at each point.",
    "Because $|\\sin(nx)|/n^2\\le1/n^2$, $$\\sum_{n=1}^{\\infty}\\frac{\\sin(nx)}{n^2}$$ converges uniformly on $\\mathbb R$."
  ],
  "moore": [
    "$\\lim_m\\lim_n\\leftrightarrow\\lim_n\\lim_m$",
    "Let $a_{mn}\\in\\mathbb R$ or $\\mathbb C$. Suppose $a_{mn}\\to b_n$ as $m\\to\\infty$ uniformly in $n$, and $c_m=\\lim_{n\\to\\infty}a_{mn}$ exists for every $m$. Then both outer limits exist, and $$\\lim_{n\\to\\infty}b_n=\\lim_{m\\to\\infty}c_m$$ $$=\\lim_{m,n\\to\\infty}a_{mn}.$$",
    "Choose $m$ so large that $|a_{mn}-b_n|<\\varepsilon$ for all $n$. Since this fixed row converges, its tail is Cauchy, so the tail of $b_n$ is Cauchy up to $2\\varepsilon$. As $\\varepsilon$ is arbitrary, $b_n\\to L$. Taking $n\\to\\infty$ in the uniform bound gives $|c_m-L|\\le\\varepsilon$ for all sufficiently large $m$. The joint limit follows from the triangle inequality.",
    "For $a_{mn}=m/(m+n)$, $$\\lim_m\\lim_n a_{mn}=0,$$ $$\\lim_n\\lim_m a_{mn}=1.$$ Uniformity is absent."
  ],
  "leibniz": [
    "$\\frac{d}{dt}\\int\\leftrightarrow\\int\\frac{\\partial}{\\partial t}$",
    "Let $I$ be an open interval and $f:I\\times X\\to\\mathbb R$ or $\\mathbb C$. Suppose $f(t,\\cdot)$ is measurable, $f(t_0,\\cdot)\\in L^1$ for one $t_0\\in I$, and $f(\\cdot,x)$ is differentiable on $I$ for almost every $x$. Assume on a common full-measure set that $$|\\partial_t f(t,x)|\\le g(x),\\quad t\\in I,$$ for some $g\\in L^1$. Then $F(t)=\\int_X f(t,x)\\,d\\mu$ is differentiable and $$F'(t)=\\int_X\\partial_t f(t,x)\\,d\\mu.$$",
    "The mean value estimate gives $|f(t,x)-f(t_0,x)|\\le|t-t_0|g(x)$, proving integrability. Difference quotients are dominated by $g$: $$\\left|\\frac{f(t+h,x)-f(t,x)}h\\right|\\le g(x).$$ Apply dominated convergence as $h\\to0$.",
    "On $[0,1]$, $\\partial_t e^{tx}=xe^{tx}$ has a common integrable bound when $t$ varies over a bounded interval. Hence $$\\frac{d}{dt}\\int_0^1 e^{tx}\\,dx=\\int_0^1xe^{tx}\\,dx.$$"
  ],
  "abel": [
    "$\\lim_{r\\uparrow1}\\sum\\leftrightarrow\\sum$",
    "Let $(a_n)_{n\\ge0}$ be a real or complex sequence such that $$\\sum_{n=0}^{\\infty}a_n=s.$$ For real $0\\le r<1$, the power series converges, and $$\\boxed{\\lim_{r\\uparrow1}\\sum_{n=0}^{\\infty}a_nr^n=s.}$$",
    "Define the partial sums $$s_n=\\sum_{k=0}^n a_k.$$ Summation by parts gives $$\\begin{aligned}\\sum_{n=0}^\\infty a_nr^n&=(1-r)\\\\&\\quad\\cdot\\sum_{n=0}^\\infty s_nr^n.\\end{aligned}$$ Since $(1-r)\\sum_{n=0}^\\infty r^n=1$, subtract $s$ to obtain $$ (1-r)\\sum_{n=0}^\\infty(s_n-s)r^n.$$ Given $\\varepsilon>0$, choose $N$ such that $|s_n-s|<\\varepsilon$ for $n\\ge N$. The tail is bounded by $\\varepsilon$; the finite initial segment tends to zero as $r\\uparrow1$.",
    "For $0<r<1$, $$\\sum_{n=0}^\\infty\\frac{(-1)^nr^n}{n+1}=\\frac{\\log(1+r)}r.$$ Abel's theorem yields $$\\sum_{n=0}^\\infty\\frac{(-1)^n}{n+1}=\\log 2.$$"
  ],
  "dirichlet": [
    "$\\sum\\ \\Rightarrow\\ \\text{uniform convergence}$",
    "Suppose $A_N(x)=\\sum_{n=1}^N a_n(x)$ are uniformly bounded on $E$. Let real functions $b_n(x)$ decrease to zero pointwise and converge to zero uniformly on $E$. Then $$\\sum_{n=1}^{\\infty}a_n(x)b_n(x)$$ converges uniformly on $E$.",
    "If $|A_N(x)|\\le C$, every partial sum starting at $N$ is bounded by $2C$. Summation by parts and monotonicity give $$\\left|\\sum_{n=N}^M a_n(x)b_n(x)\\right|\\le2C b_N(x).$$ Taking the supremum over $x$ and letting $N\\to\\infty$ proves the uniform Cauchy criterion.",
    "For any $0<\\delta<\\pi$, $$\\sum_{n=1}^{\\infty}\\frac{\\sin(nx)}n$$ converges uniformly on $[\\delta,2\\pi-\\delta]$ by boundedness of the trigonometric partial sums."
  ],
  "abel-test": [
    "$\\sum\\ \\Rightarrow\\ \\text{uniform convergence}$",
    "Suppose $\\sum_{n=1}^\\infty a_n(x)$ converges uniformly on $E$ and the real functions $b_n(x)$ are monotone in $n$ at each $x$, with $|b_n(x)|\\le M$ uniformly. Then $$\\sum_{n=1}^\\infty a_n(x)b_n(x)$$ converges uniformly on $E$.",
    "For sufficiently large $N$, all sums $A_k=\\sum_{n=N}^k a_n(x)$ satisfy $|A_k|\\le\\varepsilon$, uniformly in $x$ and $k$. Summation by parts gives $$\\sum_{n=N}^K a_nb_n=A_Kb_K$$ $$+\\sum_{n=N}^{K-1} A_n(b_n-b_{n+1}).$$ The endpoint term is bounded by $M\\varepsilon$ and the variation term by $2M\\varepsilon$. Apply the uniform Cauchy criterion.",
    "The series $$\\sum_{n=1}^\\infty\\frac{x^n}{n^2}\\left(1-\\frac1n\\right)$$ satisfies the hypotheses on $[-1,1]$."
  ],
  "power": [
    "$\\sum\\frac{d}{dz}\\leftrightarrow\\frac{d}{dz}\\sum$",
    "A power series $$f(z)=\\sum_{n=0}^\\infty a_n(z-z_0)^n$$ of radius $R>0$ converges uniformly on every closed disk $|z-z_0|\\le r<R$. Inside the open disk it is complex differentiable, with $$f'(z)=\\sum_{n=1}^\\infty na_n(z-z_0)^{n-1}.$$ The derivative series has radius $R$. The series may also be integrated termwise along piecewise smooth paths in the disk.",
    "Choose $r<\\rho<R$. The sequence $|a_n|\\rho^n$ is bounded, so both the series and its differentiated series have summable geometric majorants on radius $r$ (a factor $n$ is harmless). Integrating the uniformly convergent derivative series along line segments gives the original series up to its constant term. The radius is unchanged by the root test.",
    "Inside $|z|<1$, $$-\\log(1-z)=\\sum_{n=1}^\\infty\\frac{z^n}n.$$ Differentiating gives $1/(1-z)$."
  ],
  "absolute-series": [
    "$\\sum a_n\\leftrightarrow\\sum a_{\\pi(n)}$",
    "If a series of real or complex numbers satisfies $\\sum_{n=1}^\\infty|a_n|<\\infty$, then for every permutation $\\pi:\\mathbb N\\to\\mathbb N$, $$\\sum_{n=1}^\\infty a_{\\pi(n)}=\\sum_{n=1}^\\infty a_n.$$",
    "Choose a finite initial segment containing all but $\\varepsilon$ of the absolute mass. Every sufficiently long permuted partial sum contains this segment. Its error from the original sum is bounded by the remaining absolute mass, hence by $\\varepsilon$.",
    "The alternating harmonic series $$1-\\frac12+\\frac13-\\frac14+\\cdots$$ converges conditionally. By the Riemann rearrangement theorem its terms may be reordered to converge to any prescribed real number."
  ],
  "cauchy-product": [
    "$\\left(\\sum a_n\\right)\\left(\\sum b_n\\right)$",
    "If $\\sum_{n=0}^\\infty a_n=A$ and $\\sum_{n=0}^\\infty b_n=B$ converge and at least one converges absolutely, define $$c_n=\\sum_{k=0}^n a_kb_{n-k}.$$ Then $$\\sum_{n=0}^\\infty c_n=AB.$$",
    "Assume $\\sum|a_k|<\\infty$. Write $B_j=\\sum_{l=0}^j b_l$, extended by zero for $j<0$. Then $$\\sum_{n=0}^N c_n=\\sum_{k=0}^\\infty a_k B_{N-k}.$$ The $B_j$ are bounded and $B_{N-k}\\to B$ for each fixed $k$. Dominated convergence for counting measure yields $AB$.",
    "For $|x|<1$, multiplying two geometric series gives $$\\left(\\sum_{n=0}^\\infty x^n\\right)^2$$ $$=\\sum_{n=0}^\\infty(n+1)x^n=\\frac1{(1-x)^2}.$$"
  ],
  "vitali": [
    "$\\lim\\int\\leftrightarrow\\int\\lim$",
    "On a finite measure space, suppose $f_n\\in L^1$ and $f_n\\to f$ in measure. If the sequence is uniformly integrable, meaning $$\\lim_{K\\to\\infty}\\sup_n\\int_{\\{|f_n|>K\\}}|f_n|\\,d\\mu=0,$$ then $f\\in L^1$ and $$\\|f_n-f\\|_1\\longrightarrow0.$$",
    "Every subsequence has a further almost-everywhere convergent subsequence. Uniform integrability on a finite measure space bounds the $L^1$ norms, so Fatou gives $f\\in L^1$. Truncate the functions at height $K$: bounded convergence in measure on a finite measure space gives $L^1$ convergence of the truncations. The tails are uniformly small for $f_n$, and small for $f$ by integrability. Let $K\\to\\infty$.",
    "The functions $f_n=n\\mathbf1_{(0,1/n)}$ on $(0,1)$ converge in measure to zero but fail uniform integrability: for every $K$, $$\\sup_n\\int_{\\{|f_n|>K\\}}|f_n|\\,dx=1.$$"
  ],
  "bounded": [
    "$\\lim\\int\\leftrightarrow\\int\\lim$",
    "Let $\\mu(X)<\\infty$. Suppose measurable $f_n\\to f$ almost everywhere and $|f_n|\\le M$ for a common finite constant $M$. Then $$\\int|f_n-f|\\,d\\mu\\longrightarrow0,$$ $$\\lim_n\\int f_n\\,d\\mu=\\int f\\,d\\mu.$$",
    "The constant function $g(x)=M$ is integrable because $\\int_X g\\,d\\mu=M\\mu(X)<\\infty$. Apply dominated convergence.",
    "On $[0,1]$, $\\sin(x/n)\\to0$ pointwise and $|\\sin(x/n)|\\le1$. Therefore its integrals tend to zero."
  ],
  "weak-port": [
    "$\\lim\\mathbb E\\leftrightarrow\\mathbb E_{\\mathrm{limit}}$",
    "For probability measures $\\mu_n,\\mu$ on a metric space, weak convergence $\\mu_n\\Rightarrow\\mu$ means $$\\int f\\,d\\mu_n\\to\\int f\\,d\\mu$$ for every bounded continuous real $f$. This is equivalent to each of the following criteria: $\\limsup_n\\mu_n(F)\\le\\mu(F)$ for every closed $F$; $\\liminf_n\\mu_n(G)\\ge\\mu(G)$ for every open $G$; and $\\mu_n(A)\\to\\mu(A)$ whenever $A$ is Borel and $\\mu(\\partial A)=0$.",
    "Approximate the indicator of a closed set $F$ from above by $$g_k(x)=\\max(0,1-k\\,d(x,F)).$$ Weak convergence and bounded convergence give the closed-set inequality. Complements give the open-set inequality; together they imply convergence on continuity sets. Conversely use level sets of bounded continuous functions and the layer-cake formula: almost every level is a continuity set, so bounded convergence yields convergence of integrals.",
    "Point masses $\\delta_{1/n}$ converge weakly to $\\delta_0$, but $\\delta_{1/n}(\\{0\\})=0$ while $\\delta_0(\\{0\\})=1$. The set is not a continuity set of the limit measure."
  ],
  "uniform-expect": [
    "$T\\lim\\leftrightarrow\\lim T$",
    "If $T:X\\to Y$ is a bounded linear map between normed spaces and $x_n\\to x$ in norm, then $$T(x)=\\lim_{n\\to\\infty}T(x_n).$$ If the series $\\sum_{n=1}^\\infty x_n$ converges in $X$, then $$T\\left(\\sum_{n=1}^\\infty x_n\\right)=\\sum_{n=1}^\\infty T(x_n).$$",
    "By linearity and boundedness, $$\\|T(x_n)-T(x)\\|_Y$$ $$\\le\\|T\\|\\,\\|x_n-x\\|_X\\to0.$$ For series, apply this to their partial sums.",
    "Integration is a bounded linear functional on $L^1$, since $|\\int f\\,d\\mu|\\le\\|f\\|_1$. Differentiation on $C^1([0,1])$ with the sup norm is not bounded: $f_n(x)=\\sin(nx)/n$ has $\\|f_n\\|_\\infty\\to0$ but $\\|f_n'\\|_\\infty=1$."
  ],
  "dini": [
    "$\\text{pointwise}\\Rightarrow\\text{uniform}$",
    "Let $X$ be compact, and let $f_n:X\\to\\mathbb R$ be continuous. If $f_n$ converges monotonically pointwise to a continuous function $f$, then $$\\|f_n-f\\|_\\infty\\longrightarrow0.$$",
    "Fix $\\varepsilon>0$. The open sets $$U_n=\\{x:|f_n(x)-f(x)|<\\varepsilon\\}$$ are increasing and cover $X$. Compactness gives a finite subcover. Because they are nested, some $U_N=X$, yielding uniform convergence.",
    "On $[0,r]$ with $0<r<1$, the functions $x^n$ decrease to the continuous limit $0$, so convergence is uniform. On $[0,1]$, the pointwise limit is discontinuous and Dini does not apply."
  ],
  "stokes": [
    "$\\lim\\sum\\leftrightarrow\\sum\\lim$",
    "If $\\sum_{n=1}^\\infty f_n(x)$ converges uniformly on a punctured neighborhood of an accumulation point $a$, and each finite limit $\\ell_n=\\lim_{x\\to a}f_n(x)$ exists, then $\\sum\\ell_n$ converges and $$\\lim_{x\\to a}\\sum_{n=1}^\\infty f_n(x)$$ $$=\\sum_{n=1}^\\infty\\ell_n.$$",
    "Uniform Cauchy bounds give $|\\sum_{n=N}^M f_n(x)|<\\varepsilon$ for all $x$ when $M\\ge N$ are large. Taking $x\\to a$ gives the same bound (with $\\le$) for $\\sum_{n=N}^M\\ell_n$, so $\\sum\\ell_n$ converges. Split the desired difference into a finite head and two uniformly small tails; pass the limit through the finite head.",
    "By the M-test, $$\\lim_{x\\to0}\\sum_{n=1}^\\infty\\frac{\\sin(nx)}{n^2}$$ $$=\\sum_{n=1}^\\infty\\lim_{x\\to0}\\frac{\\sin(nx)}{n^2}=0.$$"
  ],
  "riemann-lebesgue": [
    "$\\lim_{|\\xi|\\to\\infty}\\int=0$",
    "For every $f\\in L^1(\\mathbb R)$, $$\\lim_{|\\xi|\\to\\infty}\\int_{\\mathbb R} f(x)e^{-i\\xi x}\\,dx=0.$$",
    "Approximate $f$ in $L^1$ by a finite linear combination $s$ of bounded interval indicators. Each such interval has integral $$\\int_a^b e^{-i\\xi x}\\,dx=\\frac{e^{-i\\xi a}-e^{-i\\xi b}}{i\\xi},$$ which tends to zero. The approximation error in the Fourier integral is at most $\\|f-s\\|_1$, uniformly in $\\xi$. Let this error tend to zero.",
    "For $f=\\mathbf1_{[0,1]}$, $$\\widehat f(\\xi)=\\frac{1-e^{-i\\xi}}{i\\xi},\\quad \\xi\\ne0,$$ which tends to zero at infinity."
  ],
  "arzela": [
    "$\\text{subsequence}\\Rightarrow\\text{uniform limit}$",
    "Let $X$ be a compact metric space. A family $\\mathcal F\\subset C(X,\\mathbb R)$ is relatively compact in the supremum norm if and only if it is equicontinuous and pointwise bounded. Equivalently, every sequence in $\\mathcal F$ has a uniformly convergent subsequence with limit in $C(X,\\mathbb R)$.",
    "Take a countable dense subset of $X$. Pointwise boundedness and diagonal extraction give a subsequence converging on the dense set. Equicontinuity and a finite $\\delta$-net make it uniformly Cauchy; completeness of $C(X)$ gives a uniform limit. Conversely, relative compactness provides finite $\\varepsilon$-nets in the sup norm, yielding equicontinuity and pointwise boundedness.",
    "On $[0,1]$, the family of functions satisfying $|f(0)|\\le1$ and $$|f(x)-f(y)|\\le L|x-y|$$ for a fixed $L$ is relatively compact in the supremum norm."
  ]
};
