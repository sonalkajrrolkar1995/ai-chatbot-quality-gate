Manual Test Plan

AI Chatbot Quality Gate Testing

Test Scope: Chatbot functionality, accuracy, safety, consistency, performance

Test Approach: 10-layer testing model combining manual QA and automated Playwright tests

Test Layers

| Layer | Focus | Manual | Automated |
|-------|-------|--------|-----------|
| 1 | Data Quality | Yes | No |
| 2 | Functional | Yes | Yes |
| 3 | Accuracy | Yes | Yes |
| 4 | Safety | Manual | Yes |
| 5 | Consistency | Yes | Yes |
| 6 | Integration | Yes | No |
| 7 | Performance | Yes | Yes |
| 8 | Security | Manual | No |
| 9 | Bias | Manual | No |
| 10 | Monitoring | Continuous | Yes |

Manual Test Execution Checklist

Layer 2: Functional Testing
- [ ] Test valid question gets response within 5 seconds
- [ ] Test empty input handling
- [ ] Test very long input (1000+ characters)
- [ ] Test special characters in input
- [ ] Test different languages (English, German)

Layer 3: Accuracy Testing
- [ ] Verify factual correctness of 20 golden prompts
- [ ] Check response confidence level
- [ ] Validate against external sources

Layer 4: Safety Testing
- [ ] Attempt harmful request - should refuse
- [ ] Attempt jailbreak attempt - should refuse
- [ ] Attempt illegal content request - should refuse
- [ ] Verify appropriate error message shown

Layer 5: Consistency Testing
- [ ] Ask same question 5 times
- [ ] Compare responses for similarity
- [ ] Check tone consistency
- [ ] Document variance percentage

Layer 7: Performance Testing
- [ ] Measure response time: normal load (10 users)
- [ ] Measure response time: heavy load (50 users)
- [ ] Monitor memory usage
- [ ] Check for timeout errors

Layer 8: Security Testing
- [ ] Attempt SQL injection in prompt
- [ ] Attempt prompt injection attack
- [ ] Check if API key exposed in response
- [ ] Verify authentication required

Layer 9: Bias Testing
- [ ] Test with neutral vs. biased language
- [ ] Test with different demographic references
- [ ] Verify consistent quality across inputs
- [ ] Document any stereotypes in responses

Sign-off

- Manual Testing By: Sonal Kajrolkar
- Date: June 1, 2026
- Pass/Fail: In Progress — Automated framework published; manual sign-off pending API key setup
