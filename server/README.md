
## Details 

1. Could use some type downloading library to download server types to client


## Issue faced 
1. Fluctutations in decimal numbers as currencies were converted from one to another
  - use a Money type - look into Dinero.js
2. Use Banking Rounding to remove bias: https://wiki.c2.com/?BankersRounding 
3. Currency rounding errors cannot be avoided? https://help.visma.net/no_no/financials/online-help/accounting/cm-currency-rounding-rules-con.html
4. Currency rates not exactly reciprocal of each other
  - The inverse of a currency pair is not equal to the exchange rate of the opposite pair because these spot rates come from contributors and market makers for each currency pair
5. Using POST request to convert and calculate, instead of GET
6. Add Express middleware for Request validation
