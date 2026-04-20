- None.

Returns:

```json
{ "ok": true }
```

## GET /cache

Purpose:
- Loads frontend cache version data plus persons, parties, and alliances.

User inputs:
- None.

Returns:

```json
{
  "version_id": 7,
  "persons": [
    {
      "name": "string",
      "party": "string or null",
      "party_name": "string or null",
      "alliance": "string or null",
      "alliance_name": "string or null"
    }
  ],
  "parties": ["string"],
  "party_names": ["string"],
  "alliances": ["string"],
  "alliance_names": ["string"]
}
```

Notes:
- `version_id` is read from `version_log.value` where `key = 'version_id'`.
- `persons` are sorted alphabetically by `name`.
- `parties`, `party_names`, `alliances`, and `alliance_names` are unique sorted arrays.
- Non-politician persons return `null` for party and alliance fields.

## GET /threadsList

Purpose:
- Loads the list of threads for listing pages.

User inputs:
- None.

Returns:

```json
[
  {
    "thread_id": 1,
    "title": "string",
    "summary": "string",
    "updated_at": "ISO timestamp or null"
  }
]
```

Notes:
- The current repository orders threads by `updated_at` descending.
- `created_at` and `current_position` are not returned.

## GET /threads/:id

Purpose:
- Loads one thread and its timeline entries.

User inputs:
- Path parameter `id`: thread id.

Returns:

```json
{
  "thread_id": 1,
  "title": "string",
  "summary": "string",
  "updated_at": "ISO timestamp or null",
  "timeline_entries": [
    {
      "entry_type": "incident",
      "position": 1,
      "published_at": "ISO timestamp",
      "body": "string",
      "persons_involved": [
        {
          "name": "string",
          "photo_url": "string",
          "party": {
            "name": "string"
          },
          "alliance": {
            "name": "string",
            "color": "#000000"
          }
        }
      ]
    },
    {
      "entry_type": "quote",
      "position": 2,
      "published_at": "ISO timestamp",
      "quote_text": "string",
      "speaker": {
        "name": "string",
        "photo_url": "string",
        "party": {
          "name": "string"
        },
        "alliance": {
          "name": "string",
          "color": "#000000"
        }
      },
      "persons_involved": [
        {
          "name": "string",
          "photo_url": "string",
          "party": {
            "name": "string"
          },
          "alliance": {
            "name": "string",
            "color": "#000000"
          }
        }
      ]
    }
  ]
}
```

Notes:
- `party` is `null` when the person has no party.
- `alliance` is `null` when the person has no alliance.
- `alliance.color` can be `null`.
- `source_url` is not currently returned for incidents or quotes.
- Helper ids such as `entry_id`, `speaker_id`, `person_id`, `party_id`, and `alliance_id` are not returned.
