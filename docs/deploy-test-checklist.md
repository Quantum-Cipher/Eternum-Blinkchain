# Deploy Test Checklist
1. Fund wallets: 0.5 Sepolia ETH (primary), 0.1 ETH (Blink Automation).
2. Run `deploy.js` to deploy YUKAN, NexusCoreV3.
3. Verify contracts on https://sepolia.etherscan.io.
4. Run `trigger-reward.js` to test Tier 1 reward.
5. Update `frontend/src/config.js`, redeploy to Vercel.
6. Run `blinkGrokAnimated.js` to pulse memetic glyphs.
7. Document results in `deployment-report.md`.
