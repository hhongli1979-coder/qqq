# RunPod Deployment Configuration
# This file provides guidance for RunPod deployment settings

## Recommended RunPod Configuration

### Container Settings
- **Base Port**: 80
- **Protocol**: HTTP
- **Container Disk**: 5 GB (minimum)
- **Persistent Storage**: Not required (stateless app)

### Resource Requirements
- **Minimum**:
  - CPU: 2 cores
  - RAM: 2 GB
  - Storage: 5 GB
- **Recommended**:
  - CPU: 2-4 cores
  - RAM: 4 GB
  - Storage: 10 GB

### Environment Variables
# Set these in RunPod Console when creating the endpoint
# DO NOT commit real API keys to the repository

```
# Required for AI features (set in RunPod Console)
GEMINI_API_KEY=<your-gemini-api-key>

# Optional: OpenAI support
OPENAI_API_KEY=<your-openai-api-key>

# Optional: Custom configuration
NODE_ENV=production
```

### Endpoint Configuration
- **Type**: Load Balancer (for HTTP access)
- **Workers**: 1-3 (depending on expected load)
- **GPU**: Not required (CPU-only deployment is sufficient)
- **Auto-scaling**: Enable if expecting variable load
- **Min Workers**: 1
- **Max Workers**: 5

### Health Check
The Dockerfile includes a health check that:
- Runs every 30 seconds
- Tests HTTP availability on port 80
- Allows 5 seconds for startup
- Retries up to 3 times before marking as unhealthy

### Deployment Notes
1. **Branch Selection**: Deploy from `main` or `master` branch
2. **Auto-rebuild**: Enable to rebuild on every push
3. **Build Time**: Expect 3-5 minutes for initial build
4. **Cold Start**: First request may take 10-30 seconds

### Networking
- **Ingress**: Port 80 (HTTP)
- **Egress**: Allow outbound HTTPS for API calls (Gemini/OpenAI)
- **CDN**: Consider enabling RunPod's CDN for static assets

### Monitoring
- Check the RunPod Logs tab for container output
- Monitor build status in the Builds tab
- Use built-in metrics for performance tracking

### Cost Optimization
- Use CPU instances (GPU not needed for this app)
- Enable auto-pause during inactivity
- Set appropriate max workers to control costs
- Consider spot instances for development

### Troubleshooting
If deployment fails, check:
1. Dockerfile builds successfully locally
2. All required files are in the repository
3. Port 80 is correctly exposed
4. nginx configuration is valid
5. Environment variables are set correctly

For more information, visit:
- RunPod Documentation: https://docs.runpod.io
- RunPod Console: https://www.runpod.io/console
